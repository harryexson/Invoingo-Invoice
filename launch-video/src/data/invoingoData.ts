// Source: current browser UI independently verified on October 8, 2026, and mobile.js.
// All financial values below describe fictional application preview records.
// Captured current-home.jpg, current-paid.jpg and current-miobot-draft.jpg prove the UI values.
export const invoingoData = {
  business: 'Brightline Studio', currency: 'USD', verifiedOn: '2026-10-08',
  invoices: [
    {client:'Maya Chen',number:'INV-1043',total:781.94,balance:681.94,status:'Partial',date:'2026-10-01',due:'2026-10-19',activity:'$100.00 cash payment recorded'},
    {client:'Alex Morgan',number:'INV-1042',total:1302,balance:0,status:'Paid',date:'2026-10-01',due:'2026-10-02',activity:'Bank transfer recorded on 2026-10-02'},
    {client:'Maya Chen',number:'INV-1041',total:705.25,balance:705.25,status:'Draft',date:'2026-10-01',due:'2026-10-20',activity:'Demo invoice created'}
  ],
  followUp:'Hi Maya Chen,\n\nJust a friendly reminder about invoice INV-1043. The remaining balance is $681.94 and is due on 2026-10-19.\n\nThank you,\nBrightline Studio',
};
export const money=(amount:number)=>new Intl.NumberFormat('en-US',{style:'currency',currency:invoingoData.currency}).format(amount);
