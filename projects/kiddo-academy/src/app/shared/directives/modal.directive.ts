import { Directive, Renderer2, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';

@Directive({
  selector: '[kiddoAcademyModal]',
  exportAs: 'kiddoAcademyModal',
})
export class ModalDirective implements AfterViewInit, OnDestroy {

  public payload: any;

  private _isOpen = new BehaviorSubject(false);
  private _subscriptions = new Subscription();
  private _element = this.elementRef.nativeElement;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
  }

  ngAfterViewInit(): void {
    this._setModalStyles();
    this._setOverlay();
    this._manageOpenCloseState();
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  isOpen(): Observable<boolean> {
    return this._isOpen;
  }

  open(payload?: any): void {
    this.payload = payload;
    this._isOpen.next(true);
  }

  close(): void {
    this._isOpen.next(false);
  }

  private _setModalStyles(): void {
    this.renderer.addClass(this._element, 'modal-window');
  }

  private _setOverlay(): void {
    const overlay = this.renderer.createElement('div');
    this.renderer.addClass(overlay, 'modal-window-overlay');
    const parent = this.renderer.parentNode(this._element);
    const nextSibling = this.renderer.nextSibling(this._element);
    this.renderer.insertBefore(parent, overlay, nextSibling);
    this.renderer.listen(overlay, 'click', () => this.close());
  }

  private _manageOpenCloseState(): void {
    const isOpenSubscription = this._isOpen.subscribe(open => {
      if (open) {
        this.renderer.removeClass(this._element, 'modal-window-closed');
      } else {
        this.renderer.addClass(this._element, 'modal-window-closed');
      }
    });
    this._subscriptions.add(isOpenSubscription);
  }

}
