
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;

  apiUrl = 'http://localhost:5500';

  form: FormGroup;
  loading = false;
  imageSrc = '/assets/images/new.png';

  result; // file upload 수행 이후 서버로부터 수신한 데이터

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private http: HttpClient ) {
    this.form = this.fb.group({
      avatar: ['', Validators.required]
    });
  }

  urls = [];

  // onFileChange(files: FileList) {
  //
  //   if (files && files.length > 0) {
  //
  //      const file = files[0];
  //
  //       // For Preview
  //       const reader = new FileReader();
  //
  //       reader.readAsDataURL(file);
  //       reader.onload = () => {
  //         this.imageSrc = reader.result;
  //       };
  //
  //       this.avatar.setValue(file.name);
  //
  //       console.log(file);
  //       console.log(files.length);
  //
  //     }
  // }

  onFileChange(files: FileList) {
    if (files && files.length > 0) {
      const filesAmount = files.length;

      const file = files[0];

      for (let i = 0; i < filesAmount; i++) {
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () => {
          this.urls.push(reader.result);
        };

        console.log(files.length);
        this.avatar.setValue(file.name);

      }

    }
  }


  onSubmit(files: FileList) {
    console.log('submitsubmit');
    const formData = new FormData();

    // console.log(files);

    for (let i = 0; i < files.length; i++) {
      console.log(files);
      formData.append('avatar', files[i]);
    }

    // formData.append('avatar', files[0]);

    this.loading = true;
    // Send data (payload = formData)
    // console.log(formData.get('avatar'));

    // 폼데이터를 서버로 전송한다.
    this.http.post(`${this.apiUrl}/images`, formData)
      .subscribe(res => {
        this.result = res;
        this.loading = false;
        this.avatar.setValue(null);
      });
  }

  get avatar() {
    return this.form.get('avatar');
  }

  clickEvent(event) {

    // 브라우저 좌표
    // const px = event.pageX;
    const py = event.pageY;

    const cs = event.clientX;
    // const cy = event.clientY;

    // console.log(px);
    console.log(py);

    console.log(cs);
    // console.log(cy);

    const style = 'left: ' + cs + 'px; top: ' + py + 'px';

    console.log(style);
    const box = document.getElementById('info');
    box.setAttribute('style', style);

  }

  ngOnInit() {
  }

  goBack(): void {
    this.location.back();
  }


  // 구현 중
  selectChangeHandler (files: FileList, event) {
    console.log(event.files);

    // const selectFile = event.target.file;

    const reader = new FileReader();
    const file = event.target.files[0];
    this.result = file;


    reader.readAsDataURL(file[0]);
    reader.onload = () => {
      this.imageSrc = reader.result;
    };


    this.form = event.target.file;
    console.log(this.form);
  }

}
