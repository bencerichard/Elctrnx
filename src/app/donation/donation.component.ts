import {Component, OnInit} from '@angular/core';
import {Product} from '../models/Product';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../Authentication.service';
import {Observable} from 'rxjs';
import {AgmMarkerModel, Cart, User} from '../models/User';
import {NotifierService} from 'angular-notifier';
import {ProductService} from '../Product.service';
import {UserService} from '../User.service';
import {AgmMarkerService} from '../agm-marker.service';
import {RoleEnum} from '../enums/RoleEnum';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../dialog/dialog.component';
import {Address} from '../models/Address';
import {GeocodeService} from '../geocode.service';
import {DonationSubmitDialogComponent} from '../donation-submit-dialog/donation-submit-dialog.component';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {DonationService} from '../donation.service';
import {Donation} from '../models/Donation';
import {MatIconModule} from '@angular/material/icon';
import {DeleteAgmMarkerComponent} from '../delete-agm-marker/delete-agm-marker.component';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.css']
})
export class DonationComponent implements OnInit {

  products: Product[] = [];
  user: Observable<User> = this.userService.getUserByUsername(localStorage.getItem('username'));
  clientName: string;
  private readonly notifier: NotifierService;
  product: Product;
  listOfProducts: Product[] = [];
  cart: Cart[] = [];
  agmMarkers: AgmMarkerModel[] = [];
  currentAgmMarker: AgmMarkerModel;
  showModal = false;
  lastVisitedAgmNumberOfDonations: number;
  lastVisitedAgmId: number;
  lastVisitedAgmName: string;
  hasDonationsResponsibleRole: boolean;
  showInfoModal = false;


  lat = 45.938418;
  lng = 25.559007;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private userService: UserService,
              private notifierService: NotifierService,
              private agmMarkerService: AgmMarkerService,
              private geocodeService: GeocodeService,
              public dialog: MatDialog,
              private _snackBar: MatSnackBar,
              private donationService: DonationService,
  ) {
    this.notifier = notifierService;
  }

  onChoseLocation(event) {
    console.log(event);
  }

  getUserCart(username: string) {
    this.userService.getUserByUsername(username).subscribe(user => {
        this.cart = user.cart;
        this.cart.forEach(prod => this.productService.getSingleProduct(localStorage.getItem('username'), prod.productId).subscribe(a => {
          this.listOfProducts.push(a);
        }));
      }
    );
  }


  prepareClientName() {
    this.user.subscribe(user => {
      this.clientName = user.firstName.charAt(0).toUpperCase().concat(user.lastName.charAt(0).toUpperCase());
      this.hasDonationsResponsibleRole = user.role.roleName === RoleEnum.DONATIONS_RESPONSIBLE;
    });
  }

  ngOnInit(): void {
    this.prepareClientName();
    this.getUserCart(localStorage.getItem('username'));
    this.getAgmMarkers();
  }

  favorites(): void {
    this.router.navigate(['/listing-products-favorites']);
  }

  logout(): void {
    this.authenticationService.logout();
  }

  getNumberOfItemsInCart() {
    return this.listOfProducts.length;
  }

  getAgmMarkers() {
    this.agmMarkerService.getAgmMarkers().subscribe(agmMaker => {
      this.agmMarkers = agmMaker;
    });
  }

  getAgmMarkerById(markerId: number): AgmMarkerModel {
    this.agmMarkerService.getAgmMarkerById(markerId).subscribe(agmMaker => {
      this.currentAgmMarker = agmMaker;
    });
    return this.currentAgmMarker;
  }

  getPercentageById(markerId: number) {
    // const percentage = this.getAgmMarkerById(markerId).numberOfDonations / 0.12;
    const percentage = this.agmMarkers.find(marker => marker.agmInfoId === markerId);
    return percentage.numberOfDonations / 0.12 + '%';
  }

  modalFunction() {
    this.showModal = !this.showModal;
  }

  modalInfoFunction(){
    this.showInfoModal = !this.showInfoModal;
  }

  setLastVisitedAgmNumberOfDonationsAndId(numberOfDonations: number, agmMarkerId: number, name: string) {
    this.lastVisitedAgmNumberOfDonations = numberOfDonations;
    this.lastVisitedAgmId = agmMarkerId;
    this.lastVisitedAgmName = name;
  }

  isDonationPossible(numberOfAvailableDonations): boolean {
    return !(12 - this.lastVisitedAgmNumberOfDonations >= numberOfAvailableDonations);
  }

  convertAddressToAgmMarker(address: Address, surname: string) {
    return new Promise(((resolve) => {
      this.geocodeService.getGeocode(address)
        .subscribe(result => {
            const newAgm =
              {
                lat: result.results[0].geometry.location.lat,
                lng: result.results[0].geometry.location.lng,
                numberOfDonations: 0,
                name: surname,
              } as AgmMarkerModel;
            console.log('4');
            this.createNewAgm(newAgm);
            console.log('5');
            resolve();
            console.log('6');
          }
        );
    }));
  }

  createNewAgm(agmMarkerModel: AgmMarkerModel) {
    this.agmMarkerService.createAgmMarker(agmMarkerModel).subscribe();
  }

  deleteAgmMarker(agmMarkerId: number){
    this.agmMarkerService.deleteAgmMarker(agmMarkerId).subscribe();
  }

  openDialog() {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: `Are you sure you want to delete?`
    });

    dialogRef.afterClosed().subscribe(res => {
      this.convertAddressToAgmMarker(res.data.address, res.data.surname).then(() => {
        location.reload();
      });
    });
  }

  openDialogDeleteAgmMarker(name: string, agmMarkerId: number) {
    let dialogRef = this.dialog.open(DeleteAgmMarkerComponent, {
      data: {name: name}
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res){
        this.deleteAgmMarker(agmMarkerId);
        location.reload();
      }
    });
  }

  openDialogSubmitDonation(amount: number) {
    let dialogRef = this.dialog.open(DonationSubmitDialogComponent, {
      data: {name: this.lastVisitedAgmName, amount: amount}
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.donationService.createDonation({
          familyName: this.lastVisitedAgmName,
          amount: amount,
          userDTO: {username: localStorage.getItem('username')},
          wasRedeemed: false
        } as Donation).subscribe(() => {
          this.openSnackBar('Thank you for your donation!');
          this.agmMarkerService.updateAgmMarker(this.lastVisitedAgmId, amount / 300).subscribe(() => {
            setTimeout(() => {
              location.reload();
            }, 1500);
          });
        }, error => { this.modalInfoFunction(); this.showModal = false});
      }
    });
  }

  openSnackBar(message: string) {
    let config = new MatSnackBarConfig();
    config.panelClass = ['custom-class'];
    this._snackBar.open(message, '✓', {
      duration: 5000,
      panelClass: ['custom-class']
    });
  }
}
