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
  isLoading = false;
  constructor(public postsService:PostsService){}
  // posts=[
  //   {title:'First Post', content:'this is first post'},
  //   {title:'Second Post', content:'this is second post'},
  //   {title:'Third Post', content:'this is third post'}

  // ]

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts();
    this.postSubs=this.postsService.getPostUpdateListener().subscribe(
      (posts:Post[])=>{
        this.isLoading = false;
        this.posts=posts;
    })
  }

  onDelete(postId:string){
    this.postsService.deletePost(postId);

  }
  ngOnDestroy(){
    this.postSubs.unsubscribe();
  }

}
