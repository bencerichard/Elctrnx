import {Component, OnInit} from '@angular/core';
import {Product} from '../Product';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../Authentication.service';
import {Observable} from 'rxjs';
import {AgmMarkerModel, Cart, User} from '../User';
import {NotifierService} from 'angular-notifier';
import {ProductService} from '../Product.service';
import {UserService} from '../User.service';
import {AgmMarkerService} from '../agm-marker.service';

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

  agmInfoWindowHelper: AgmMarkerModel[] = [
    {
      agmInfoId: 1,
      lng: '21.42',
      lat: '46.06',
      numberOfDonations: 6,
      name: 'Ionescu'
    },
    {
      agmInfoId: 2,
      lng: '26.166916932732576',
      lat: '44.42771627091487',
      numberOfDonations: 3,
      name: 'Popescu'
    },
    {
      agmInfoId: 3,
      lng: '23.7',
      lat: '47.6',
      numberOfDonations: 9,
      name: 'Meszaros'
    },
  ];

  lat = 45.938418;
  lng = 25.559007;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private userService: UserService,
              private notifierService: NotifierService,
              private donationService: AgmMarkerService
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
      const userArray = user.fullName.split(' ', 2);
      this.clientName = userArray[1].charAt(0).toUpperCase().concat(userArray[0].charAt(0).toUpperCase());
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
    this.donationService.getAgmMarkers().subscribe(agmMaker => {
      this.agmMarkers = agmMaker;
    });
  }

  getAgmMarkerById(markerId: number): AgmMarkerModel {
    this.donationService.getAgmMarkerById(markerId).subscribe(agmMaker => {
      this.currentAgmMarker = agmMaker;
    });
    return this.currentAgmMarker;
  }

  getPercentageById(markerId: number) {
    // const percentage = this.getAgmMarkerById(markerId).numberOfDonations / 0.12;
    const percentage = this.agmMarkers.find(marker => marker.agmInfoId === markerId);
    return percentage.numberOfDonations/ 0.12 + '%';
  }
}
