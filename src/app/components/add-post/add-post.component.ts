import { ServiceService } from 'src/app/service.service';
import { Component } from '@angular/core';
import { IProfile } from 'src/app/interfaces/profile';
import { IPost } from 'src/app/interfaces/ipost';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PostService } from 'src/app/post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent {
  constructor(
    private srv:ServiceService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private postSvc: PostService
  ){}

  profilo!: IProfile
  posts!: IPost[]

  ngOnInit(){
    this.srv.getMe().subscribe(profilo => this.profilo = profilo)
    this.postSvc.getPosts().subscribe( posts => this.posts = posts)
  }

  formData:Partial<IPost> = {
    text:''
  }

  openModal(content: any) {
    this.modalService.open(content);
  }

  form!:FormGroup

  posta(){
    this.postSvc.createPost(this.form.value).subscribe(() => {
      this.modalService.dismissAll()
      this.postSvc.getPosts().subscribe(posts => {
        this.posts = posts
        this.form.reset()
      })
    })
  }

}
