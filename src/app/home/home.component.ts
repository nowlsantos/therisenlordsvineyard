import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, Injector } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styles: []
})
export class HomeComponent implements OnInit {
    @ViewChild('header', { read: ViewContainerRef}) headerRef: ViewContainerRef;
    @ViewChild('vocation', { read: ViewContainerRef}) vocationRef: ViewContainerRef;
    @ViewChild('corevalues', { read: ViewContainerRef}) corevaluesRef: ViewContainerRef;
    @ViewChild('footer', { read: ViewContainerRef}) footerRef: ViewContainerRef;

    constructor(private resolver: ComponentFactoryResolver,
                private injector: Injector) { }

    ngOnInit(): void {
        this.loadHeader();
        this.loadVocation();
        this.loadCoreValues();
        this.loadFooter();
    }

    async loadHeader() {
        const { HeaderComponent } = await import('./header/header.component');
        const headerFactory = this.resolver.resolveComponentFactory(HeaderComponent);
        this.headerRef.createComponent(headerFactory, null, this.injector);
    }

    async loadVocation() {
        const { VocationComponent } = await import('./vocation/vocation.component');
        const vocationFactory = this.resolver.resolveComponentFactory(VocationComponent);
        this.vocationRef.createComponent(vocationFactory, null, this.injector);
    }

    async loadCoreValues() {
        const { CoreValuesComponent } = await import('./core-values/core-values.component');
        const corevaluesFactory = this.resolver.resolveComponentFactory(CoreValuesComponent);
        this.corevaluesRef.createComponent(corevaluesFactory, null, this.injector);
    }

    async loadFooter() {
        const { FooterComponent } = await import('./footer/footer.component');
        const footerFactory = this.resolver.resolveComponentFactory(FooterComponent);
        this.footerRef.createComponent(footerFactory, null, this.injector);
    }
}
