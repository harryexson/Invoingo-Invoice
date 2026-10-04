/* Catalog and industry screens reuse the workspace's storage and document editor. */
let catalogQuery='',catalogType='all',catalogCategory='all',suggestedIndustry='';
function industryOptions(){return [['','Select your industry'],...Catalog.industries.map(i=>[i.id,i.name])];}
function catalogPage(){
  suggestedIndustry=suggestedIndustry||db.settings.industry||'';
  return head('Products & services','Your billable work and products, ready for every estimate and invoice.',btn('＋ Add item','new-service','','primary'))+
    `<section class="panel industry-panel"><div class="panel-head"><div><h2>Start with your industry</h2><p class="muted">Choose suggested items, then set your own prices.</p></div></div>${select('industry','Industry / nature of business',industryOptions(),suggestedIndustry).replace('<select name="industry"','<select id="catalog-industry" name="industry"')}<div id="industry-suggestions">${industrySuggestions(suggestedIndustry,'catalog')}</div></section>`+
    `<section class="panel"><div class="panel-head"><h2>Your catalog <span class="muted">(${db.services.length})</span></h2>${btn('Export catalog','export-catalog')}</div><div class="toolbar">${catalogFilters('library')}</div><div id="catalog-results">${catalogResults()}</div></section>`;
}
function industrySuggestions(id,context){
  const industry=Catalog.get(id);if(!industry)return '<p class="muted">Select an industry to see common billable categories, services, and products.</p>';
  const existing=new Set(db.services.map(s=>s.templateId));
  return `<div class="suggestion-head"><p><b>${esc(industry.name)}</b> · ${industry.items.length} starting items</p><label class="check-label"><input type="checkbox" data-select-suggestions="${context}" checked> Select all available</label></div><div class="suggestion-grid">${industry.items.map(item=>{
    const present=existing.has(item.templateId)||db.services.some(s=>s.name.trim().toLowerCase()===item.name.toLowerCase()&&(s.type||'service')===item.type);
    return `<label class="suggestion ${present?'already-added':''}"><input type="checkbox" name="${context}-template" value="${item.templateId}" ${present?'disabled':'checked'}><span><b>${esc(item.name)}</b><small>${esc(item.category)} · ${item.type==='product'?'Product':'Service'} / ${esc(item.unit)}${present?' · In your catalog':''}</small></span></label>`;
  }).join('')}</div><p class="muted small-copy">Suggested items have no preset prices. Customize names, categories, units, and prices after adding them.</p>${context==='catalog'?`<div class="actions">${btn('Add selected items','import-industry',id,'primary')}${btn('Set as my industry','set-industry',id)}</div>`:''}`;
}
function catalogFilters(context){
  const categories=[...new Set(db.services.map(s=>s.category).filter(Boolean))].sort();
  return `<input id="${context}-search" aria-label="Search ${context==='library'?'catalog':'items'}" placeholder="Search name, category, or SKU" value="${esc(catalogQuery)}"><select id="${context}-type" aria-label="Item type"><option value="all">Products & services</option><option value="product" ${catalogType==='product'?'selected':''}>Products</option><option value="service" ${catalogType==='service'?'selected':''}>Services</option></select><select id="${context}-category" aria-label="Item category"><option value="all">All categories</option>${categories.map(c=>`<option value="${esc(c)}" ${catalogCategory===c?'selected':''}>${esc(c)}</option>`).join('')}</select>`;
}
function catalogResults(){
  const items=Catalog.search(db.services,catalogQuery,catalogType,catalogCategory);
  if(!items.length)return empty(db.services.length?'No matching items':'Your catalog starts here',db.services.length?'Try a different search or filter.':'Add your own products and services, or choose industry suggestions above.',btn('Add item','new-service','','primary'));
  return `<div class="cards">${items.map(item=>`<article class="catalog-card"><div class="catalog-card-top">${tag(item.type==='product'?'Product':'Service')}<span class="muted">${esc(item.category||'Uncategorized')}</span></div><h3>${esc(item.name)}</h3>${item.description?`<p class="muted item-description">${esc(item.description)}</p>`:''}<p class="catalog-price">${item.rate===null?'Set your price':cash(item.rate)} <small class="muted">/ ${esc(item.unit)}</small></p>${item.sku?`<p class="muted small-copy">SKU: ${esc(item.sku)}</p>`:''}<div class="actions">${btn('Edit','edit-service',item.id)}${btn('Create invoice','invoice-item',item.id)}${btn('Create estimate','estimate-item',item.id)}${btn('Delete','delete-service',item.id,'danger')}</div></article>`).join('')}</div>`;
}
function showCatalogItem(id){
  const item=db.services.find(s=>s.id===id)||{},categories=[...new Set(db.services.map(s=>s.category).filter(Boolean))].sort();
  formModal(item.id?'Edit catalog item':'Add product or service','service-form',`<input type="hidden" name="id" value="${item.id||''}"><div class="grid2">${select('type','Item type',[['service','Service'],['product','Product']],item.type||'service')}${select('industry','Industry',industryOptions(),item.industry||db.settings.industry||'')}</div>${fields('name','Item name',item.name,'text','required maxlength="160"')}${textField('description','Description',item.description||'')}<div class="grid2">${fields('category','Category',item.category||'','text','maxlength="80" list="catalog-categories"')}${fields('sku','SKU / item code',item.sku||'','text','maxlength="80"')}</div><datalist id="catalog-categories">${categories.map(c=>`<option value="${esc(c)}">`).join('')}</datalist><div class="grid2">${fields('rate','Unit price (optional)',item.rate??'','number','min="0" max="10000000" step="0.01"')}${fields('unit','Unit',item.unit||'item','text','required maxlength="40" placeholder="hour, item, gallon, project…"')}</div><p class="muted">Leave the price blank to enter it when preparing an estimate or invoice.</p>`);
}
function industrySettings(){
  const s=db.settings;
  return `<h2>Industry / nature of business</h2>${select('industry','Primary industry',industryOptions(),s.industry||'').replace('<select name="industry"','<select id="settings-industry" name="industry"')}${fields('customIndustry','Describe your business (optional)',s.customIndustry||'','text','maxlength="120" placeholder="e.g. Mobile welding and equipment repair"')}<details class="additional-industries"><summary>Additional industries</summary><p class="muted">Select any other industries your business serves.</p><div class="industry-checkboxes">${Catalog.industries.map(i=>`<label class="check-label"><input type="checkbox" name="additionalIndustries" value="${i.id}" ${(s.industries||[]).includes(i.id)?'checked':''}>${esc(i.name)}</label>`).join('')}</div></details><div id="settings-industry-suggestions">${industrySuggestions(s.industry||'','settings')}</div>`;
}
function showItemPicker(){
  readEditor();catalogQuery='';catalogType='all';catalogCategory='all';
  modal('Add products & services',`<p class="muted">Select items from your catalog. Prices and quantities can be adjusted in the document.</p><div class="toolbar picker-toolbar">${catalogFilters('picker')}</div><div id="picker-results">${pickerResults()}</div><div class="error" id="modal-error" role="alert"></div><div class="actions picker-actions">${btn('Add selected to document','add-picked-items','','primary')}${btn('Cancel','close')}</div>`);
  $('#dialog').classList.add('catalog-dialog');
}
let pickerSelected=new Set();
function pickerResults(){
  const items=Catalog.search(db.services,catalogQuery,catalogType,catalogCategory);
  return items.length?`<div class="picker-list">${items.map(i=>`<label class="picker-item"><input type="checkbox" data-picker-item="${i.id}" ${pickerSelected.has(i.id)?'checked':''}><span><b>${esc(i.name)}</b><small>${i.type==='product'?'Product':'Service'} · ${esc(i.category||'Uncategorized')} · ${esc(i.unit)}${i.sku?' · '+esc(i.sku):''}</small></span><strong>${i.rate===null?'Price needed':cash(i.rate)}</strong></label>`).join('')}</div>`:empty('No matching catalog items','Add items under Products & services, or enter a custom line in this document.');
}
function appendCatalogItems(ids){
  const items=ids.map(id=>db.services.find(s=>s.id===id)).filter(Boolean);if(!items.length)throw Error('Select at least one item.');
  if(editDoc.items.length===1&&!editDoc.items[0].name.trim())editDoc.items=[];
  editDoc.items.push(...items.map(Catalog.toLine));editor();
}
function itemFields(item,n){
  return `<div class="line-entry" data-line="${n}"><div class="line-item"><input name="item-name" aria-label="Item ${n+1} description" required maxlength="160" value="${esc(item.name)}"><input name="item-qty" aria-label="Item ${n+1} quantity" type="number" required min="0.01" max="100000" step="0.01" value="${item.qty}"><input name="item-rate" aria-label="Item ${n+1} rate" type="number" required min="0" max="10000000" step="0.01" value="${item.rate??''}" placeholder="Price">${btn('×','remove-line',n)}</div><details class="line-options" ${item.type==='product'?'open':''}><summary>${item.type==='product'?'Product':'Service'}${item.unit?' / '+esc(item.unit):''} · Item details</summary><div class="grid3">${select('item-type','Type',[['service','Service'],['product','Product']],item.type||'service')}${fields('item-unit','Unit',item.unit||'item','text','required maxlength="40"')}${fields('item-category','Category',item.category||'','text','maxlength="80"')}</div>${fields('item-description','Additional description',item.description||'','text','maxlength="2000"')}${fields('item-sku','SKU / item code',item.sku||'','text','maxlength="80"')}</details></div>`;
}
function documentItemMeta(i){return `${i.description?`<small>${esc(i.description)}</small>`:''}${i.category||i.sku?`<small>${esc([i.category,i.sku&&'SKU: '+i.sku].filter(Boolean).join(' · '))}</small>`:''}`;}
