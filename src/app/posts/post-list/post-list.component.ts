import { Component, OnInit,Input, OnDestroy } from '@angular/core';
import { EventEmitter } from 'protractor';
import {Post} from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts:Post[] = [];
  postSubs : Subscription
  constructor(public postsService:PostsService){}
  // posts=[
  //   {title:'First Post', content:'this is first post'},
  //   {title:'Second Post', content:'this is second post'},
  //   {title:'Third Post', content:'this is third post'}

  // ]

  ngOnInit() {
    this.postSubs=this.postsService.getPostUpdateListener().subscribe(
      (posts:Post[])=>{
        this.posts=posts;
    })
  }
  ngOnDestroy(){
    this.postSubs.unsubscribe();
  }

}
