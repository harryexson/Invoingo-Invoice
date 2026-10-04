/* Editable starting points, never price recommendations. Set your own rates. */
(function(root){
  const definitions = [
    ['handymen','Handymen / Handyman',[
      ['General repairs','Labor','service','hour'],['Furniture assembly','Assembly','service','item'],['Fixture installation','Installation','service','item'],['Repair materials','Materials','product','item'],['Service call','Call-out','service','visit']]],
    ['painters','Painters',[
      ['Interior painting','Painting','service','room'],['Exterior painting','Painting','service','project'],['Surface preparation','Preparation','service','hour'],['Paint','Materials','product','gallon'],['Trim painting','Finishing','service','linear foot']]],
    ['builders','Builders',[
      ['Construction labor','Labor','service','hour'],['Site preparation','Site work','service','project'],['Framing','Construction','service','project'],['Building materials','Materials','product','item'],['Project management','Management','service','hour']]],
    ['contractors','Contractors',[
      ['Contract labor','Labor','service','hour'],['Demolition','Site work','service','project'],['Remodeling','Construction','service','project'],['Materials','Materials','product','item'],['Equipment rental','Equipment','service','day']]],
    ['authors','Authors',[
      ['Manuscript writing','Writing','service','project'],['Editing','Editorial','service','hour'],['Proofreading','Editorial','service','page'],['Author consultation','Consultation','service','hour'],['Printed book','Books','product','copy'],['E-book','Books','product','copy']]],
    ['mechanics','Mechanics',[
      ['Diagnostic inspection','Diagnostics','service','vehicle'],['Repair labor','Labor','service','hour'],['Oil change','Maintenance','service','vehicle'],['Brake service','Repairs','service','axle'],['Replacement parts','Parts','product','item']]],
    ['graphic-designers','Graphic Designers',[
      ['Logo design','Branding','service','project'],['Brand identity','Branding','service','project'],['Website design','Digital design','service','project'],['Design revisions','Design','service','hour'],['Digital template','Digital products','product','item']]],
    ['accounting-finance','Accounting & Finance',[
      ['Bookkeeping','Accounting','service','month'],['Tax preparation','Tax services','service','return'],['Payroll processing','Payroll','service','month'],['Financial reporting','Reporting','service','report'],['Accounting consultation','Consultation','service','hour']]],
    ['advertising-design','Advertising & Graphic Design',[
      ['Ad campaign planning','Advertising','service','campaign'],['Ad creative design','Design','service','asset'],['Brand identity','Branding','service','project'],['Social media design','Digital design','service','asset'],['Print artwork','Design','service','project']]],
    ['apartments-buildings','Apartments & Other Buildings',[
      ['Rent','Rental','service','month'],['Common-area maintenance','Maintenance','service','month'],['Unit cleaning','Cleaning','service','unit'],['Repair labor','Repairs','service','hour'],['Replacement fixtures','Fixtures','product','item']]],
    ['associations-clubs','Associations & Clubs',[
      ['Membership dues','Membership','service','year'],['Event registration','Events','service','person'],['Facility rental','Rental','service','hour'],['Club merchandise','Merchandise','product','item'],['Program fee','Programs','service','session']]],
    ['auto-dealer','Auto Dealer',[
      ['Vehicle sale','Vehicles','product','vehicle'],['Vehicle accessories','Accessories','product','item'],['Vehicle detailing','Preparation','service','vehicle'],['Delivery service','Delivery','service','vehicle'],['Trade-in appraisal','Appraisal','service','vehicle']]],
    ['auto-service','Auto Service',[
      ['Vehicle inspection','Diagnostics','service','vehicle'],['Oil change','Maintenance','service','vehicle'],['Tire rotation','Maintenance','service','vehicle'],['Repair labor','Repairs','service','hour'],['Auto parts','Parts','product','item']]],
    ['bakeries','Bakeries',[
      ['Custom cake','Cakes','product','cake'],['Bread','Baked goods','product','loaf'],['Pastry assortment','Baked goods','product','dozen'],['Decorating service','Customization','service','order'],['Delivery','Delivery','service','order']]],
    ['cleaning-janitorial','Cleaning & Janitorial',[
      ['Regular cleaning','Cleaning','service','visit'],['Deep cleaning','Cleaning','service','project'],['Move-out cleaning','Cleaning','service','unit'],['Window cleaning','Specialty cleaning','service','window'],['Cleaning supplies','Supplies','product','item']]],
    ['consultants','Consultants',[
      ['Consulting session','Consultation','service','hour'],['Business assessment','Assessment','service','project'],['Strategy development','Strategy','service','project'],['Workshop facilitation','Training','service','session'],['Monthly retainer','Retainer','service','month']]],
    ['cosmetology','Cosmetology',[
      ['Makeup application','Beauty services','service','session'],['Hair styling','Hair','service','session'],['Skin treatment','Skin care','service','session'],['Beauty consultation','Consultation','service','session'],['Beauty products','Products','product','item']]],
    ['electricians','Electricians',[
      ['Electrical diagnostic','Diagnostics','service','visit'],['Electrical labor','Labor','service','hour'],['Outlet installation','Installation','service','outlet'],['Lighting installation','Installation','service','fixture'],['Electrical supplies','Materials','product','item']]],
    ['financial-advisors','Financial Advisors',[
      ['Financial planning consultation','Planning','service','hour'],['Financial plan preparation','Planning','service','plan'],['Portfolio review','Review','service','review'],['Retirement planning','Planning','service','project'],['Ongoing advisory service','Advisory','service','month']]],
    ['food-service','Food Service',[
      ['Catering meal','Food','product','person'],['Food preparation','Labor','service','hour'],['Event service staff','Staffing','service','hour'],['Equipment rental','Equipment','service','day'],['Food delivery','Delivery','service','order']]],
    ['healthcare','Healthcare',[
      ['Consultation','Consultation','service','visit'],['Follow-up visit','Visits','service','visit'],['Treatment session','Treatment','service','session'],['Health assessment','Assessment','service','assessment'],['Medical supplies','Supplies','product','item']]],
    ['home-inspectors','Home Inspectors',[
      ['Home inspection','Inspection','service','property'],['Pre-listing inspection','Inspection','service','property'],['Reinspection','Inspection','service','visit'],['Inspection report','Reporting','service','report'],['Additional structure inspection','Inspection','service','structure']]],
    ['hotels','Hotels',[
      ['Room accommodation','Accommodation','service','night'],['Meeting room rental','Events','service','hour'],['Breakfast','Food','product','person'],['Laundry service','Laundry','service','item'],['Parking','Parking','service','day']]],
    ['information-technology','Information Technology',[
      ['Technical support','Support','service','hour'],['Software development','Development','service','hour'],['Network setup','Installation','service','project'],['Managed IT services','Support','service','month'],['Computer hardware','Hardware','product','item'],['Software license','Software','product','license']]],
    ['insurance-agents','Insurance Agents',[
      ['Policy consultation','Consultation','service','hour'],['Coverage review','Review','service','review'],['Risk assessment','Assessment','service','project'],['Administrative services','Administration','service','hour']]],
    ['landlords','Landlords',[
      ['Monthly rent','Rent','service','month'],['Parking rental','Rental','service','month'],['Storage rental','Rental','service','month'],['Maintenance service','Maintenance','service','visit'],['Cleaning service','Cleaning','service','unit']]],
    ['laundry','Laundry Businesses',[
      ['Wash and fold','Laundry','service','pound'],['Dry cleaning','Dry cleaning','service','item'],['Ironing','Finishing','service','item'],['Laundry pickup','Delivery','service','trip'],['Laundry supplies','Supplies','product','item']]],
    ['landscaping','Lawncare & Landscaping',[
      ['Lawn mowing','Lawn care','service','visit'],['Landscape installation','Landscaping','service','project'],['Hedge trimming','Maintenance','service','hour'],['Mulch','Materials','product','cubic yard'],['Plants','Plants','product','item'],['Seasonal cleanup','Cleanup','service','visit']]],
    ['lawyers','Lawyers',[
      ['Legal consultation','Consultation','service','hour'],['Document preparation','Documents','service','document'],['Legal research','Research','service','hour'],['Representation','Legal services','service','hour'],['Case administration','Administration','service','hour']]],
    ['liquor-stores','Liquor Stores',[
      ['Wine','Wine','product','bottle'],['Beer','Beer','product','pack'],['Spirits','Spirits','product','bottle'],['Gift packaging','Accessories','product','item'],['Local delivery','Delivery','service','order']]],
    ['manufacturers','Manufacturers',[
      ['Manufactured product','Products','product','unit'],['Custom fabrication','Fabrication','service','hour'],['Production setup','Production','service','run'],['Packaging','Packaging','product','unit'],['Freight','Shipping','service','shipment']]],
    ['medical-malpractice','Medical Malpractice',[
      ['Case review','Case services','service','hour'],['Medical record review','Review','service','hour'],['Expert consultation','Consultation','service','hour'],['Report preparation','Reporting','service','report'],['Expert testimony preparation','Preparation','service','hour']]],
    ['offices','Offices',[
      ['Office rental','Rental','service','month'],['Meeting room booking','Rental','service','hour'],['Administrative support','Administration','service','hour'],['Office supplies','Supplies','product','item'],['Document processing','Documents','service','document']]],
    ['personal-trainers','Personal Trainers',[
      ['Personal training','Training','service','session'],['Group training','Training','service','person'],['Fitness assessment','Assessment','service','assessment'],['Training plan','Programs','service','plan'],['Fitness equipment','Equipment','product','item']]],
    ['pet-services','Pet Services',[
      ['Pet grooming','Grooming','service','pet'],['Dog walking','Walking','service','visit'],['Pet sitting','Sitting','service','day'],['Pet boarding','Boarding','service','night'],['Pet supplies','Supplies','product','item']]],
    ['photographers','Photographers',[
      ['Photo session','Photography','service','session'],['Event photography','Photography','service','hour'],['Photo editing','Editing','service','hour'],['Photo prints','Prints','product','print'],['Photo album','Albums','product','album'],['Image licensing','Licensing','service','image']]],
    ['printing-copying','Printing & Copying',[
      ['Document printing','Printing','product','page'],['Photocopying','Copying','service','page'],['Business cards','Printing','product','batch'],['Binding','Finishing','service','document'],['Large-format print','Printing','product','print']]],
    ['professional-installation','Professional Installation',[
      ['Installation labor','Labor','service','hour'],['Appliance installation','Installation','service','appliance'],['Equipment setup','Installation','service','item'],['Site assessment','Assessment','service','visit'],['Installation materials','Materials','product','item']]],
    ['real-estate','Real Estate',[
      ['Property consultation','Consultation','service','hour'],['Property marketing','Marketing','service','listing'],['Listing photography','Photography','service','property'],['Property management','Management','service','month'],['Transaction coordination','Administration','service','transaction']]],
    ['restaurants','Restaurants',[
      ['Prepared meal','Food','product','meal'],['Beverage','Drinks','product','item'],['Private dining','Events','service','event'],['Catering','Catering','service','person'],['Delivery','Delivery','service','order']]],
    ['retail','Retail',[
      ['Retail product','Products','product','item'],['Gift wrapping','Packaging','service','item'],['Delivery','Delivery','service','order'],['Customization','Customization','service','item'],['Accessories','Accessories','product','item']]],
    ['salons-spas','Salons & Spas',[
      ['Haircut','Hair','service','session'],['Hair coloring','Hair','service','session'],['Massage','Wellness','service','session'],['Facial','Skin care','service','session'],['Nail service','Nails','service','session'],['Salon products','Products','product','item']]],
    ['townhouse-associations','Townhouse Associations',[
      ['Association dues','Dues','service','month'],['Common-area maintenance','Maintenance','service','month'],['Facility reservation','Facilities','service','booking'],['Landscaping service','Landscaping','service','visit'],['Repair materials','Materials','product','item']]],
    ['transportation','Transportation',[
      ['Passenger transport','Transport','service','trip'],['Freight transport','Freight','service','shipment'],['Mileage','Transport','service','mile'],['Loading and unloading','Labor','service','hour'],['Waiting time','Time','service','hour']]],
    ['other','Other',[
      ['Consultation','Consultation','service','hour'],['General service','Services','service','project'],['Product','Products','product','item'],['Materials','Materials','product','item'],['Delivery','Delivery','service','order']]]
  ];
  const industries=definitions.map(([id,name,items])=>({id,name,items:items.map(([name,category,type,unit],i)=>({templateId:`${id}-${i+1}`,name,category,type,unit,description:'',sku:'',rate:null,industry:id}))}));
  const normalize=s=>String(s||'').trim().toLowerCase().replace(/\s+/g,' ');
  function get(id){return industries.find(i=>i.id===id);}
  function validate(item){
    if(typeof item.name!=='string'||!item.name.trim()||item.name.length>160)throw Error('Enter an item name (up to 160 characters).');
    if(!['service','product'].includes(item.type)||typeof item.unit!=='string'||!item.unit.trim()||item.unit.length>40)throw Error('Choose an item type and enter a unit.');
    if(item.rate!==null&&(!Number.isFinite(item.rate)||item.rate<0||item.rate>10000000))throw Error('Enter a valid price or leave it blank to price it later.');
    for(const [key,max] of [['category',80],['description',2000],['sku',80]])if(typeof item[key]!=='string'||item[key].length>max)throw Error(`Check the ${key}.`);
    if(item.industry&&!get(item.industry))throw Error('Choose a listed industry or Other.');
  }
  function importItems(existing,industryId,templateIds,idFactory){
    const industry=get(industryId);if(!industry)throw Error('Choose an industry.');
    const wanted=new Set(templateIds),result=existing.slice();let added=0,skipped=0;
    for(const item of industry.items.filter(i=>wanted.has(i.templateId))){
      if(result.some(s=>s.templateId===item.templateId||(normalize(s.name)===normalize(item.name)&&(s.type||'service')===item.type))){skipped++;continue;}
      result.push({...item,id:idFactory()});added++;
    }
    return {items:result,added,skipped};
  }
  function toLine(item){return {name:item.name,qty:1,rate:item.rate,unit:item.unit,type:item.type||'service',category:item.category||'',description:item.description||'',sku:item.sku||'',catalogId:item.id};}
  function search(items,query='',type='all',category='all'){
    const q=normalize(query);return items.filter(i=>(type==='all'||(i.type||'service')===type)&&(category==='all'||i.category===category)&&normalize([i.name,i.description,i.category,i.sku].join(' ')).includes(q));
  }
  const api={industries,get,validate,importItems,toLine,search};
  if(typeof module!=='undefined')module.exports=api;else root.Catalog=api;
})(typeof window!=='undefined'?window:globalThis);
