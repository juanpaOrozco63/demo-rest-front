import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { ShoppingCartService } from '../../../../services/shopping-cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ShoppingCart } from 'src/app/domain/ShoppingCart';
import { ShoppingProduct } from '../../../../domain/shoppingProduct';
import { ShoppingProductService } from '../../../../services/shopping-product.service';
import Swal from 'sweetalert2';
import { purchaseModel } from '../../../../models/purchase';
import { PaymentMethodService } from '../../../../services/payment-method.service';
import { PaymentMethod } from '../../../../domain/payment-method';
import { CloseShoppingCart } from '../../../../domain/close-shopping-cart';
@Component({
  selector: 'app-purchase-detail',
  templateUrl: './purchase-detail.component.html',
  styleUrls: ['./purchase-detail.component.css']
})
export class PurchaseDetailComponent implements OnInit {
  public carts:ShoppingCart[];
  public products:ShoppingProduct[];
  public products2:ShoppingProduct[]=null;
  public purchase:purchaseModel=new purchaseModel();
  public payments:PaymentMethod[];
  public cartClose:CloseShoppingCart= new CloseShoppingCart(null,null);

  constructor(public shoppingProductService:ShoppingProductService,public shoppingCartService:ShoppingCartService,private routActive:ActivatedRoute,public paymentMethodService:PaymentMethodService,public route:Router) { }
  carId:number;
  email:string=null;
  pageActual:number=1;
  totalInvoice:number=0
  ngOnInit(): void {
    this.getCarId();
    this.findAllPayment();

  }
  getCarId():void{
    this.routActive.params.subscribe(resp=>{
      let email =resp['email'];
      this.email=email;
      if(email){
        this.shoppingCartService.findCarIdShoppingCartsByEmail(email).subscribe(resp=>{
          this.carts=resp;
          this.carts.forEach(resp => {
            if(resp.paymentMethodId==null){
              this.carId=resp.carId;

            }
          });
          this.getProducts();
        })

      }
    })
  }
  getProducts():void{
    this.shoppingProductService.findAll().subscribe(resp=>{
      this.products=resp;
      this.products2=[];
      this.products.forEach(resp => {
        if(resp.shoppingCartId===this.carId){
          this.products2.push(resp);
          this.totalInvoice+=resp.total 
        }   
      });
    })
  }
  delete(proId:number):void{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Yes, delete it! ${proId}`
    }).then((result) => {
      if (result.isConfirmed) {
        this.shoppingCartService.removeProduct(this.carId,proId).subscribe(data=>{
          this.getProducts();
        },error=>{
          Swal.fire(
            'Error!',
            `${error.error.error}`,
            'error'
          )
        })
        Swal.fire(
          'Deleted!',
         ` Your shoppinProduct with shprId ${proId} has been deleted.`,
          'success'
        )
      }
    })
    
  }
  findAllPayment():void{
    this.paymentMethodService.findAll().subscribe(data=>{
      this.payments=data;
    },error=>{
      console.error(error);
    })
  }
  closePurchase():void{
    this.cartClose.carId=this.carId;
    this.cartClose.payId=this.purchase.cardType;
    this.shoppingCartService.closeShoppingCart(this.cartClose).subscribe((resp)=>{
      Swal.fire(
        'Your Purchase was confirmed!',
        `Your Shopping Cart with carId: ${this.cartClose.carId} now has payment method with payId: ${this.cartClose.payId}.`,
        'success'
      )
        this.route.navigate(['/homeNormal']);
    }
    )

  }
}
