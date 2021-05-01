import {Component, OnInit} from '@angular/core';
import {Cart, Image, OrderInput2, User} from "../models/User";
import {UserService} from "../User.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../Authentication.service";
import {Observable} from "rxjs";
import {Location} from "@angular/common";
import {first} from "rxjs/operators";
import {NotifierService} from "angular-notifier";
import {ProductService} from "../Product.service";
import {Product} from "../models/Product";

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  returnUrl: string;
  id: number;
  userNav: Observable<User> = this.userService.getUserByUsername(localStorage.getItem('username'));
  clientName: string;
  isEditingEnabled = false;
  isAdmin: boolean;
  private readonly notifier: NotifierService;
  users: User[] = [];
  user: User;
  allUsernames: string[];
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  hoar: number;
  image: Image;
  displayMessage = false;
  showModal = false;
  orderList: OrderInput2[] = [];
  userPass: string;
  product: Product;
  cart: Cart[];


  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private location: Location,
              private authenticationService: AuthenticationService,
              private notifierService: NotifierService,
              private router: Router,
              private productService: ProductService,
  ) {
    this.notifier = notifierService;
  }

  prepareForUpload(): boolean {
    this.displayMessage = true;
    return true;
  }


  getAllOrders() {
    this.userService.getAllOrders(localStorage.getItem('username')).subscribe(
      orders => {
        this.orderList = orders;
      }
    )
  }

  prepareClientName() {
    this.userNav.subscribe(user => {
      debugger
      this.clientName = user.firstName.charAt(0).toUpperCase().concat(user.lastName.charAt(0).toUpperCase());
      this.isAdmin = user.role.roleName === 'Admin';
    });
  }

  accountEditForm = new FormGroup({
    username: new FormControl('',
      [
        Validators.required,
        Validators.minLength(3)
      ]),
    firstName: new FormControl('',
      [
        Validators.required,
        Validators.pattern(/^[A-Z][a-z]+$/)
      ]),
    lastName: new FormControl('',
      [
        Validators.required,
        Validators.pattern(/^[A-Z][a-z]+$/)
      ]),
    email: new FormControl('',
      [
        Validators.required,
        Validators
          .pattern(
            /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)
      ]),
    country: new FormControl('',
      [
        Validators.required,
        Validators.pattern(/^[A-Z][a-z]+$/)
      ]),
    city: new FormControl('',
      [
        Validators.required,
        Validators.pattern(/^[A-Z][a-z]+$/)
      ]),
    street: new FormControl('',
      [
        Validators.required,
        Validators.pattern(/^[A-Z][a-z]+$/)
      ]),
    password: new FormControl('',
      [
        Validators.required,
        Validators.minLength(3)
      ]),
    confirmPassword: new FormControl('',
      [
        Validators.required,
        Validators.minLength(3),
      ])
  });

  getUsers(): void {
    this.userService.getUsers().subscribe(
      users => {
        this.users = users;
      }
    )
  }

  getSingleUser(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getSingleUser(id).subscribe(
      user => {
        this.user = user;
      }
    )
  }

  getUser(username: string): void {
    this.userService.getUserByUsername(username).subscribe(
      user => {
        this.user = user;
        this.image = user.image;
        if (user.image != null)
          this.getImage();
      }
    )
  }

  ngOnInit(): void {
    this.userService.getUserByUsername(localStorage.getItem('username')).subscribe(data => {

      this.userPass = localStorage.getItem('pass');

      this.accountEditForm = new FormGroup({
        username: new FormControl(
          data.username,
          [
            Validators.required,
            Validators.minLength(3)
          ]
        ),
        firstName: new FormControl(data.firstName,
          [
            Validators.required,
            Validators.pattern(/^[A-Z][a-z]+$/)
          ]
        ),
        lastName: new FormControl(data.lastName,
          [
            Validators.required,
            Validators.pattern(/^[A-Z][a-z]+$/)
          ]
        ),
        email: new FormControl(data.emailAddress,
          [
            Validators.required,
            Validators
              .pattern(
                /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)
          ]),
        country: new FormControl(data.addressDTO.addressCountry,
          [
            Validators.required,
            Validators.pattern(/^[A-Z][a-z]+$/)
          ]
        ),
        city: new FormControl(data.addressDTO.addressCity,
          [
            Validators.required,
            Validators.pattern(/^[A-Z][a-z]+$/)
          ]
        ),
        street: new FormControl(data.addressDTO.addressStreet,
          [
            Validators.required,
            Validators.pattern(/^[A-Za-z]/)
          ]
        ),
        password: new FormControl(this.userPass,
          [
            Validators.required,
            Validators.minLength(3)
          ]),
        passwordConfirm: new FormControl(this.userPass,
          [
            Validators.required,
            Validators.minLength(3)
          ]),
      });
    });
    this.getUsers();
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    this.prepareClientName();
    this.getUser(localStorage.getItem('username'));

    this.userService.getCustomerHoar(localStorage.getItem('username')).subscribe(
      hoar => {
        this.hoar = hoar
      }
    );

    this.getAllUsernames();
    this.getAllOrders();
  }

  getAllUsernames() {
    this.userService.getAllUsernames(localStorage.getItem('username')).subscribe(
      usernames => this.allUsernames = usernames
    );

  }

  updateUser(): void {

    let ok = 1;

    this.allUsernames.forEach(
      username => {
        if (username === this.editedData.username.value) {
          this.notifier.notify("error", "This username is taken");
          ok = 0;
        }
      }
    );

    if (ok === 1 && this.editedData.password.value === this.editedData.passwordConfirm.value
      && this.editedData.username.value != '' && this.editedData.password.value != '') {

      this.userService.updateUser(localStorage.getItem('username'), {
        username: this.editedData.username.value,
        password: this.editedData.password.value,
        confirmPassword: this.editedData.passwordConfirm.value,
        firstName: this.editedData.firstName.value,
        lastName: this.editedData.lastName.value,
        emailAddress: this.editedData.email.value,
        addressDTO: {
          addressCountry: this.editedData.country.value,
          addressCity: this.editedData.city.value,
          addressStreet: this.editedData.street.value
        },
        role: this.isAdmin === true ? {roleName: 'Admin'} : {roleName: 'Client'},
        cart: [],
        favorites: []
      } as User).pipe(first()).subscribe(
        data => {
          localStorage.setItem('username', this.editedData.username.value);
          location.reload();
          this.notifier.notify("info", "Account updated with success");
        },
        error => {
          if (error.error.message === '1') {
            this.notifier.notify("warning", "Please enter your Full name");
          } else {
            this.notifier.notify("error", "This username is taken");
          }
        }
      );
    } else {
      if (this.editedData.username.value === '' && ok === 1) {
        this.notifier.notify("error", "Enter an username");
      } else {
        if (this.editedData.password.value === '' || this.editedData.passwordConfirm.value === '' && ok === 1) {
          this.notifier.notify("error", "Enter password");
        } else if (ok === 1) {
          this.notifier.notify("error", "Password doesn't match confirm Password");
        }
      }
    }
  }

  get editedData() {
    return this.accountEditForm.controls;
  }

  enableEdit() {
    this.isEditingEnabled = true;
  }

  disableEdit() {
    this.isEditingEnabled = false;
  }

  findInvalidControls(name: string) {
    if (this.accountEditForm.get(name).invalid) {
      return true;
    }
  }

  conditionalRoute(){
    if(this.isAdmin)
      this.router.navigate(['/add']);
  }

  goBack(): void {
    this.authenticationService.isLoggedIn = true;
    this.location.back();
  }

  public onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  uploadImage() {
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    this.userService.postImage(uploadImageData, localStorage.getItem('username')).subscribe(() => {
    });
    location.reload();
  }

  getImage(): void {

    this.userService.getImage(localStorage.getItem('username'))
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );

  }

  modalFunction() {
    this.showModal = !this.showModal;
  }

  getProduct(id: number): Product {
    this.productService.getSingleProduct(localStorage.getItem('username'), id)
      .subscribe(product => {
          this.product = product;
          // @ts-ignore
          this.product.price = product.price.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&.');
          // @ts-ignore
          this.product.price = this.product.price.toString().substring(0, this.product.price.toString().length - 2);
        }
      );

    return this.product;
  }
}
