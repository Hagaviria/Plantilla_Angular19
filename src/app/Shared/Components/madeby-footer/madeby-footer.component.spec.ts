import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MadebyFooterComponent } from './madeby-footer.component';

describe('MadebyFooterComponent', () => {
  let component: MadebyFooterComponent;
  let fixture: ComponentFixture<MadebyFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MadebyFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MadebyFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display current year', () => {
    const currentYear = new Date().getFullYear();
    expect(component.currentYear).toBe(currentYear);
  });

  it('should display author name', () => {
    expect(component.authorName).toBeDefined();
    expect(component.authorName.length).toBeGreaterThan(0);
  });

  it('should display project name', () => {
    expect(component.projectName).toBeDefined();
    expect(component.projectName.length).toBeGreaterThan(0);
  });
});
