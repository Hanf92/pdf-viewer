import {Component, h, Prop, State, Watch} from '@stencil/core';
import {createPDFUrl} from "../../service/pdf.service";
import error_icon from '../../assets/emblem-error.svg';

@Component({
  tag: 'pdf-viewer',
  styleUrl: 'pdf-viewer.css',
  shadow: true,
})
export class PdfViewer {
  /**
   * Download url of PDF
   */
  @Prop() downloadUrl: string;
  /**
   * Add class to iframe
   */
  @Prop() customClass?: string;
  /**
   * Render custom loading component
   */
  @Prop() loadingComponent?: () => any;
  /**
   * Render custom error component
   */
  @Prop() errorComponent?: () => any;

  @State() iframeSrc: string;
  @State() isLoading: boolean = true;
  @State() isError: boolean = false;

  loadPDF() {
    this.isLoading = true;
    createPDFUrl(this.downloadUrl).then((response) => {
      this.isLoading = false;
      this.isError = false;
      this.iframeSrc = response;
    }, (_) => {
      this.isLoading = false;
      this.isError = true;
    })
  }

  componentDidLoad() {
    if(this.downloadUrl){
      this.loadPDF();
    }
  }

  @Watch('downloadUrl')
  watchHandler(newValue: string, oldValue: string) {
    if(newValue !== oldValue){
      this.loadPDF();
    }
  }

  render() {
    if(this.isLoading){
      if(this.loadingComponent){
        this.loadingComponent()
      }
      return (<div>Loading...</div>)
    }
    if(this.isError){
      if(this.errorComponent){
        this.errorComponent()
      }
      return (<img src={error_icon} alt={'pdf not loaded'} height={25}/>)
    }
    return (
      <iframe src={this.iframeSrc} class={this.customClass ? this.customClass : ''}/>
    );
  }

}

