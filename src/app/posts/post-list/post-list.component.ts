import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   { title: "First Post", content: "This is the first post's content" },
  //   { title: "Second Post", content: "This is the second post's content" },
  //   { title: "Third Post", content: "This is the third post's content" }
  // ];
  posts: Post[] = [];
  isLoading = false;
  totalPost = 0;
  postsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  UserIsAuthenticated = false;
  userId: string;
  private AuthStatusSub: Subscription;
  private postsSub: Subscription;

  constructor(public postsService: PostsService, private authService: AuthService) {}

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts(this.postsPerPage , this.currentPage);
    this.userId = this.authService.getuserId();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((postData: {posts: Post[], postcount: number}) => {
        this.isLoading = false;
        this.totalPost = postData.postcount;
        this.posts = postData.posts;
      });
      this.UserIsAuthenticated = this.authService.getIsAuth();
      this.AuthStatusSub = this.authService.getAuthStatusListener().subscribe(isAuthenicated => {
       this.UserIsAuthenticated = isAuthenicated;
       this.userId = this.authService.getuserId();
      });
  }
  OnChangePage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage , this.currentPage);
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId).subscribe( () => {
      this.postsService.getPosts(this.postsPerPage , this.currentPage);
    }, () => {
       this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.AuthStatusSub.unsubscribe();
  }
}
