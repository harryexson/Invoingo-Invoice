var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// catalog.js
var require_catalog = __commonJS({
  "catalog.js"(exports, module) {
    (function(root) {
      const definitions = [
        ["handymen", "Handymen / Handyman", [
          ["General repairs", "Labor", "service", "hour"],
          ["Furniture assembly", "Assembly", "service", "item"],
          ["Fixture installation", "Installation", "service", "item"],
          ["Repair materials", "Materials", "product", "item"],
          ["Service call", "Call-out", "service", "visit"]
        ]],
        ["painters", "Painters", [
          ["Interior painting", "Painting", "service", "room"],
          ["Exterior painting", "Painting", "service", "project"],
          ["Surface preparation", "Preparation", "service", "hour"],
          ["Paint", "Materials", "product", "gallon"],
          ["Trim painting", "Finishing", "service", "linear foot"]
        ]],
        ["builders", "Builders", [
          ["Construction labor", "Labor", "service", "hour"],
          ["Site preparation", "Site work", "service", "project"],
          ["Framing", "Construction", "service", "project"],
          ["Building materials", "Materials", "product", "item"],
          ["Project management", "Management", "service", "hour"]
        ]],
        ["contractors", "Contractors", [
          ["Contract labor", "Labor", "service", "hour"],
          ["Demolition", "Site work", "service", "project"],
          ["Remodeling", "Construction", "service", "project"],
          ["Materials", "Materials", "product", "item"],
          ["Equipment rental", "Equipment", "service", "day"]
        ]],
        ["authors", "Authors", [
          ["Manuscript writing", "Writing", "service", "project"],
          ["Editing", "Editorial", "service", "hour"],
          ["Proofreading", "Editorial", "service", "page"],
          ["Author consultation", "Consultation", "service", "hour"],
          ["Printed book", "Books", "product", "copy"],
          ["E-book", "Books", "product", "copy"]
        ]],
        ["mechanics", "Mechanics", [
          ["Diagnostic inspection", "Diagnostics", "service", "vehicle"],
          ["Repair labor", "Labor", "service", "hour"],
          ["Oil change", "Maintenance", "service", "vehicle"],
          ["Brake service", "Repairs", "service", "axle"],
          ["Replacement parts", "Parts", "product", "item"]
        ]],
        ["graphic-designers", "Graphic Designers", [
          ["Logo design", "Branding", "service", "project"],
          ["Brand identity", "Branding", "service", "project"],
          ["Website design", "Digital design", "service", "project"],
          ["Design revisions", "Design", "service", "hour"],
          ["Digital template", "Digital products", "product", "item"]
        ]],
        ["accounting-finance", "Accounting & Finance", [
          ["Bookkeeping", "Accounting", "service", "month"],
          ["Tax preparation", "Tax services", "service", "return"],
          ["Payroll processing", "Payroll", "service", "month"],
          ["Financial reporting", "Reporting", "service", "report"],
          ["Accounting consultation", "Consultation", "service", "hour"]
        ]],
        ["advertising-design", "Advertising & Graphic Design", [
          ["Ad campaign planning", "Advertising", "service", "campaign"],
          ["Ad creative design", "Design", "service", "asset"],
          ["Brand identity", "Branding", "service", "project"],
          ["Social media design", "Digital design", "service", "asset"],
          ["Print artwork", "Design", "service", "project"]
        ]],
        ["apartments-buildings", "Apartments & Other Buildings", [
          ["Rent", "Rental", "service", "month"],
          ["Common-area maintenance", "Maintenance", "service", "month"],
          ["Unit cleaning", "Cleaning", "service", "unit"],
          ["Repair labor", "Repairs", "service", "hour"],
          ["Replacement fixtures", "Fixtures", "product", "item"]
        ]],
        ["associations-clubs", "Associations & Clubs", [
          ["Membership dues", "Membership", "service", "year"],
          ["Event registration", "Events", "service", "person"],
          ["Facility rental", "Rental", "service", "hour"],
          ["Club merchandise", "Merchandise", "product", "item"],
          ["Program fee", "Programs", "service", "session"]
        ]],
        ["auto-dealer", "Auto Dealer", [
          ["Vehicle sale", "Vehicles", "product", "vehicle"],
          ["Vehicle accessories", "Accessories", "product", "item"],
          ["Vehicle detailing", "Preparation", "service", "vehicle"],
          ["Delivery service", "Delivery", "service", "vehicle"],
          ["Trade-in appraisal", "Appraisal", "service", "vehicle"]
        ]],
        ["auto-service", "Auto Service", [
          ["Vehicle inspection", "Diagnostics", "service", "vehicle"],
          ["Oil change", "Maintenance", "service", "vehicle"],
          ["Tire rotation", "Maintenance", "service", "vehicle"],
          ["Repair labor", "Repairs", "service", "hour"],
          ["Auto parts", "Parts", "product", "item"]
        ]],
        ["bakeries", "Bakeries", [
          ["Custom cake", "Cakes", "product", "cake"],
          ["Bread", "Baked goods", "product", "loaf"],
          ["Pastry assortment", "Baked goods", "product", "dozen"],
          ["Decorating service", "Customization", "service", "order"],
          ["Delivery", "Delivery", "service", "order"]
        ]],
        ["cleaning-janitorial", "Cleaning & Janitorial", [
          ["Regular cleaning", "Cleaning", "service", "visit"],
          ["Deep cleaning", "Cleaning", "service", "project"],
          ["Move-out cleaning", "Cleaning", "service", "unit"],
          ["Window cleaning", "Specialty cleaning", "service", "window"],
          ["Cleaning supplies", "Supplies", "product", "item"]
        ]],
        ["consultants", "Consultants", [
          ["Consulting session", "Consultation", "service", "hour"],
          ["Business assessment", "Assessment", "service", "project"],
          ["Strategy development", "Strategy", "service", "project"],
          ["Workshop facilitation", "Training", "service", "session"],
          ["Monthly retainer", "Retainer", "service", "month"]
        ]],
        ["cosmetology", "Cosmetology", [
          ["Makeup application", "Beauty services", "service", "session"],
          ["Hair styling", "Hair", "service", "session"],
          ["Skin treatment", "Skin care", "service", "session"],
          ["Beauty consultation", "Consultation", "service", "session"],
          ["Beauty products", "Products", "product", "item"]
        ]],
        ["electricians", "Electricians", [
          ["Electrical diagnostic", "Diagnostics", "service", "visit"],
          ["Electrical labor", "Labor", "service", "hour"],
          ["Outlet installation", "Installation", "service", "outlet"],
          ["Lighting installation", "Installation", "service", "fixture"],
          ["Electrical supplies", "Materials", "product", "item"]
        ]],
        ["financial-advisors", "Financial Advisors", [
          ["Financial planning consultation", "Planning", "service", "hour"],
          ["Financial plan preparation", "Planning", "service", "plan"],
          ["Portfolio review", "Review", "service", "review"],
          ["Retirement planning", "Planning", "service", "project"],
          ["Ongoing advisory service", "Advisory", "service", "month"]
        ]],
        ["food-service", "Food Service", [
          ["Catering meal", "Food", "product", "person"],
          ["Food preparation", "Labor", "service", "hour"],
          ["Event service staff", "Staffing", "service", "hour"],
          ["Equipment rental", "Equipment", "service", "day"],
          ["Food delivery", "Delivery", "service", "order"]
        ]],
        ["healthcare", "Healthcare", [
          ["Consultation", "Consultation", "service", "visit"],
          ["Follow-up visit", "Visits", "service", "visit"],
          ["Treatment session", "Treatment", "service", "session"],
          ["Health assessment", "Assessment", "service", "assessment"],
          ["Medical supplies", "Supplies", "product", "item"]
        ]],
        ["home-inspectors", "Home Inspectors", [
          ["Home inspection", "Inspection", "service", "property"],
          ["Pre-listing inspection", "Inspection", "service", "property"],
          ["Reinspection", "Inspection", "service", "visit"],
          ["Inspection report", "Reporting", "service", "report"],
          ["Additional structure inspection", "Inspection", "service", "structure"]
        ]],
        ["hotels", "Hotels", [
          ["Room accommodation", "Accommodation", "service", "night"],
          ["Meeting room rental", "Events", "service", "hour"],
          ["Breakfast", "Food", "product", "person"],
          ["Laundry service", "Laundry", "service", "item"],
          ["Parking", "Parking", "service", "day"]
        ]],
        ["information-technology", "Information Technology", [
          ["Technical support", "Support", "service", "hour"],
          ["Software development", "Development", "service", "hour"],
          ["Network setup", "Installation", "service", "project"],
          ["Managed IT services", "Support", "service", "month"],
          ["Computer hardware", "Hardware", "product", "item"],
          ["Software license", "Software", "product", "license"]
        ]],
        ["insurance-agents", "Insurance Agents", [
          ["Policy consultation", "Consultation", "service", "hour"],
          ["Coverage review", "Review", "service", "review"],
          ["Risk assessment", "Assessment", "service", "project"],
          ["Administrative services", "Administration", "service", "hour"]
        ]],
        ["landlords", "Landlords", [
          ["Monthly rent", "Rent", "service", "month"],
          ["Parking rental", "Rental", "service", "month"],
          ["Storage rental", "Rental", "service", "month"],
          ["Maintenance service", "Maintenance", "service", "visit"],
          ["Cleaning service", "Cleaning", "service", "unit"]
        ]],
        ["laundry", "Laundry Businesses", [
          ["Wash and fold", "Laundry", "service", "pound"],
          ["Dry cleaning", "Dry cleaning", "service", "item"],
          ["Ironing", "Finishing", "service", "item"],
          ["Laundry pickup", "Delivery", "service", "trip"],
          ["Laundry supplies", "Supplies", "product", "item"]
        ]],
        ["landscaping", "Lawncare & Landscaping", [
          ["Lawn mowing", "Lawn care", "service", "visit"],
          ["Landscape installation", "Landscaping", "service", "project"],
          ["Hedge trimming", "Maintenance", "service", "hour"],
          ["Mulch", "Materials", "product", "cubic yard"],
          ["Plants", "Plants", "product", "item"],
          ["Seasonal cleanup", "Cleanup", "service", "visit"]
        ]],
        ["lawyers", "Lawyers", [
          ["Legal consultation", "Consultation", "service", "hour"],
          ["Document preparation", "Documents", "service", "document"],
          ["Legal research", "Research", "service", "hour"],
          ["Representation", "Legal services", "service", "hour"],
          ["Case administration", "Administration", "service", "hour"]
        ]],
        ["liquor-stores", "Liquor Stores", [
          ["Wine", "Wine", "product", "bottle"],
          ["Beer", "Beer", "product", "pack"],
          ["Spirits", "Spirits", "product", "bottle"],
          ["Gift packaging", "Accessories", "product", "item"],
          ["Local delivery", "Delivery", "service", "order"]
        ]],
        ["manufacturers", "Manufacturers", [
          ["Manufactured product", "Products", "product", "unit"],
          ["Custom fabrication", "Fabrication", "service", "hour"],
          ["Production setup", "Production", "service", "run"],
          ["Packaging", "Packaging", "product", "unit"],
          ["Freight", "Shipping", "service", "shipment"]
        ]],
        ["medical-malpractice", "Medical Malpractice", [
          ["Case review", "Case services", "service", "hour"],
          ["Medical record review", "Review", "service", "hour"],
          ["Expert consultation", "Consultation", "service", "hour"],
          ["Report preparation", "Reporting", "service", "report"],
          ["Expert testimony preparation", "Preparation", "service", "hour"]
        ]],
        ["offices", "Offices", [
          ["Office rental", "Rental", "service", "month"],
          ["Meeting room booking", "Rental", "service", "hour"],
          ["Administrative support", "Administration", "service", "hour"],
          ["Office supplies", "Supplies", "product", "item"],
          ["Document processing", "Documents", "service", "document"]
        ]],
        ["personal-trainers", "Personal Trainers", [
          ["Personal training", "Training", "service", "session"],
          ["Group training", "Training", "service", "person"],
          ["Fitness assessment", "Assessment", "service", "assessment"],
          ["Training plan", "Programs", "service", "plan"],
          ["Fitness equipment", "Equipment", "product", "item"]
        ]],
        ["pet-services", "Pet Services", [
          ["Pet grooming", "Grooming", "service", "pet"],
          ["Dog walking", "Walking", "service", "visit"],
          ["Pet sitting", "Sitting", "service", "day"],
          ["Pet boarding", "Boarding", "service", "night"],
          ["Pet supplies", "Supplies", "product", "item"]
        ]],
        ["photographers", "Photographers", [
          ["Photo session", "Photography", "service", "session"],
          ["Event photography", "Photography", "service", "hour"],
          ["Photo editing", "Editing", "service", "hour"],
          ["Photo prints", "Prints", "product", "print"],
          ["Photo album", "Albums", "product", "album"],
          ["Image licensing", "Licensing", "service", "image"]
        ]],
        ["printing-copying", "Printing & Copying", [
          ["Document printing", "Printing", "product", "page"],
          ["Photocopying", "Copying", "service", "page"],
          ["Business cards", "Printing", "product", "batch"],
          ["Binding", "Finishing", "service", "document"],
          ["Large-format print", "Printing", "product", "print"]
        ]],
        ["professional-installation", "Professional Installation", [
          ["Installation labor", "Labor", "service", "hour"],
          ["Appliance installation", "Installation", "service", "appliance"],
          ["Equipment setup", "Installation", "service", "item"],
          ["Site assessment", "Assessment", "service", "visit"],
          ["Installation materials", "Materials", "product", "item"]
        ]],
        ["real-estate", "Real Estate", [
          ["Property consultation", "Consultation", "service", "hour"],
          ["Property marketing", "Marketing", "service", "listing"],
          ["Listing photography", "Photography", "service", "property"],
          ["Property management", "Management", "service", "month"],
          ["Transaction coordination", "Administration", "service", "transaction"]
        ]],
        ["restaurants", "Restaurants", [
          ["Prepared meal", "Food", "product", "meal"],
          ["Beverage", "Drinks", "product", "item"],
          ["Private dining", "Events", "service", "event"],
          ["Catering", "Catering", "service", "person"],
          ["Delivery", "Delivery", "service", "order"]
        ]],
        ["retail", "Retail", [
          ["Retail product", "Products", "product", "item"],
          ["Gift wrapping", "Packaging", "service", "item"],
          ["Delivery", "Delivery", "service", "order"],
          ["Customization", "Customization", "service", "item"],
          ["Accessories", "Accessories", "product", "item"]
        ]],
        ["salons-spas", "Salons & Spas", [
          ["Haircut", "Hair", "service", "session"],
          ["Hair coloring", "Hair", "service", "session"],
          ["Massage", "Wellness", "service", "session"],
          ["Facial", "Skin care", "service", "session"],
          ["Nail service", "Nails", "service", "session"],
          ["Salon products", "Products", "product", "item"]
        ]],
        ["townhouse-associations", "Townhouse Associations", [
          ["Association dues", "Dues", "service", "month"],
          ["Common-area maintenance", "Maintenance", "service", "month"],
          ["Facility reservation", "Facilities", "service", "booking"],
          ["Landscaping service", "Landscaping", "service", "visit"],
          ["Repair materials", "Materials", "product", "item"]
        ]],
        ["transportation", "Transportation", [
          ["Passenger transport", "Transport", "service", "trip"],
          ["Freight transport", "Freight", "service", "shipment"],
          ["Mileage", "Transport", "service", "mile"],
          ["Loading and unloading", "Labor", "service", "hour"],
          ["Waiting time", "Time", "service", "hour"]
        ]],
        ["other", "Other", [
          ["Consultation", "Consultation", "service", "hour"],
          ["General service", "Services", "service", "project"],
          ["Product", "Products", "product", "item"],
          ["Materials", "Materials", "product", "item"],
          ["Delivery", "Delivery", "service", "order"]
        ]]
      ];
      const industries = definitions.map(([id, name, items]) => ({ id, name, items: items.map(([name2, category, type, unit], i) => ({ templateId: `${id}-${i + 1}`, name: name2, category, type, unit, description: "", sku: "", rate: null, industry: id })) }));
      const normalize = (s) => String(s || "").trim().toLowerCase().replace(/\s+/g, " ");
      function get(id) {
        return industries.find((i) => i.id === id);
      }
      function validate(item) {
        if (typeof item.name !== "string" || !item.name.trim() || item.name.length > 160) throw Error("Enter an item name (up to 160 characters).");
        if (!["service", "product"].includes(item.type) || typeof item.unit !== "string" || !item.unit.trim() || item.unit.length > 40) throw Error("Choose an item type and enter a unit.");
        if (item.rate !== null && (!Number.isFinite(item.rate) || item.rate < 0 || item.rate > 1e7)) throw Error("Enter a valid price or leave it blank to price it later.");
        for (const [key, max] of [["category", 80], ["description", 2e3], ["sku", 80]]) if (typeof item[key] !== "string" || item[key].length > max) throw Error(`Check the ${key}.`);
        if (item.industry && !get(item.industry)) throw Error("Choose a listed industry or Other.");
      }
      function importItems(existing, industryId, templateIds, idFactory) {
        const industry = get(industryId);
        if (!industry) throw Error("Choose an industry.");
        const wanted = new Set(templateIds), result = existing.slice();
        let added = 0, skipped = 0;
        for (const item of industry.items.filter((i) => wanted.has(i.templateId))) {
          if (result.some((s) => s.templateId === item.templateId || normalize(s.name) === normalize(item.name) && (s.type || "service") === item.type)) {
            skipped++;
            continue;
          }
          result.push({ ...item, id: idFactory() });
          added++;
        }
        return { items: result, added, skipped };
      }
      function toLine(item) {
        return { name: item.name, qty: 1, rate: item.rate, unit: item.unit, type: item.type || "service", category: item.category || "", description: item.description || "", sku: item.sku || "", catalogId: item.id };
      }
      function search(items, query = "", type = "all", category = "all") {
        const q = normalize(query);
        return items.filter((i) => (type === "all" || (i.type || "service") === type) && (category === "all" || i.category === category) && normalize([i.name, i.description, i.category, i.sku].join(" ")).includes(q));
      }
      const api2 = { industries, get, validate, importItems, toLine, search };
      if (typeof module !== "undefined") module.exports = api2;
      else root.Catalog = api2;
    })(typeof window !== "undefined" ? window : globalThis);
  }
});

// domain.js
var require_domain = __commonJS({
  "domain.js"(exports, module) {
    (function(root) {
      const Catalog = typeof module !== "undefined" ? require_catalog() : root.Catalog;
      const round = (n) => Math.round((n + Number.EPSILON) * 100) / 100;
      const currencyFallback = "AED AFN ALL AMD ANG AOA ARS AUD AWG AZN BAM BBD BDT BGN BHD BIF BMD BND BOB BRL BSD BTN BWP BYN BZD CAD CDF CHF CLP CNY COP CRC CUP CVE CZK DJF DKK DOP DZD EGP ERN ETB EUR FJD FKP GBP GEL GHS GIP GMD GNF GTQ GYD HKD HNL HTG HUF IDR ILS INR IQD IRR ISK JMD JOD JPY KES KGS KHR KMF KPW KRW KWD KYD KZT LAK LBP LKR LRD LSL LYD MAD MDL MGA MKD MMK MNT MOP MRU MUR MVR MWK MXN MYR MZN NAD NGN NIO NOK NPR NZD OMR PAB PEN PGK PHP PKR PLN PYG QAR RON RSD RUB RWF SAR SBD SCR SDG SEK SGD SHP SLE SOS SRD SSP STN SVC SYP SZL THB TJS TMT TND TOP TRY TTD TWD TZS UAH UGX USD UYU UZS VED VES VND VUV WST XAF XCD XCG XOF XPF YER ZAR ZMW ZWG";
      const currencies = [.../* @__PURE__ */ new Set([...currencyFallback.split(" "), ...typeof Intl.supportedValuesOf === "function" ? Intl.supportedValuesOf("currency") : []])].filter((c) => !["XAG", "XAU", "XBA", "XBB", "XBC", "XBD", "XDR", "XPD", "XPT", "XSU", "XTS", "XUA", "XXX"].includes(c)).sort();
      const validCurrency = (c) => currencies.includes(c);
      const currencyOf = (d) => d.currency || d.businessSnapshot?.currency || "USD";
      const currencyDigits = (c) => {
        try {
          return new Intl.NumberFormat("en", { style: "currency", currency: c }).resolvedOptions().maximumFractionDigits;
        } catch {
          return 2;
        }
      };
      const roundCurrency = (n, c = "USD") => {
        const factor = 10 ** currencyDigits(c);
        return Math.round((n + Number.EPSILON) * factor) / factor;
      };
      const formatMoney = (n, c = "USD", locale) => new Intl.NumberFormat(locale || void 0, { style: "currency", currency: c }).format(n);
      function currencyOptions(locale) {
        let names;
        try {
          names = new Intl.DisplayNames([locale || "en"], { type: "currency" });
        } catch {
        }
        return currencies.map((c) => [c, `${c} \u2014 ${names?.of(c) || c}`]);
      }
      function initializeCurrency(db) {
        for (const d of [...db.invoices, ...db.estimates, ...db.expenses]) if (!d.currency) d.currency = d.businessSnapshot?.currency || db.settings.currency;
        return db;
      }
      const providerDigits = (c) => ["ISK", "UGX"].includes(c) ? 2 : currencyDigits(c);
      const toProviderAmount = (n, c) => Math.round(roundCurrency(n, c) * 10 ** providerDigits(c));
      const fromProviderAmount = (n, c) => n / 10 ** providerDigits(c);
      function reportRange(preset = "this-month", today = (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA")) {
        if (!validDate(today)) throw Error("Choose a valid report date.");
        const year = Number(today.slice(0, 4)), month = Number(today.slice(5, 7)), date = (y, m, d) => `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
        const monthEnd = (y, m) => date(y, m, new Date(Date.UTC(y, m, 0)).getUTCDate());
        if (preset === "last-month") {
          const m = month === 1 ? 12 : month - 1, y = month === 1 ? year - 1 : year;
          return { start: date(y, m, 1), end: monthEnd(y, m) };
        }
        if (preset === "last-year") return { start: date(year - 1, 1, 1), end: date(year - 1, 12, 31) };
        if (preset === "year-to-date") return { start: date(year, 1, 1), end: today };
        if (preset === "this-year") return { start: date(year, 1, 1), end: date(year, 12, 31) };
        if (preset === "last-3-months") {
          const d = new Date(Date.UTC(year, month - 4, 1)), end = new Date(Date.UTC(year, month - 1, 0));
          return { start: d.toISOString().slice(0, 10), end: end.toISOString().slice(0, 10) };
        }
        return { start: date(year, month, 1), end: monthEnd(year, month) };
      }
      function report(db, range) {
        const { start, end } = range;
        if (!validDate(start) || !validDate(end) || start > end) throw Error("Choose a valid start and end date, with the end on or after the start.");
        const within = (date) => date >= start && date <= end, groups = {}, payments = [], expenses = [];
        const group = (currency) => groups[currency] || (groups[currency] = { currency, revenue: 0, expenses: 0, tax: 0, net: 0, paymentCount: 0, clients: {} });
        for (const d of db.invoices.filter((d2) => !["Draft", "Void"].includes(d2.status))) {
          const currency = d.currency || d.businessSnapshot?.currency || db.settings.currency, t = totals(d), client = d.clientSnapshot || db.clients.find((c) => c.id === d.clientId) || { name: "Unknown client" };
          for (const p of d.payments.filter((p2) => !p2.reversed && within(p2.date))) {
            const g = group(currency);
            g.revenue += p.amount;
            g.tax += t.total ? p.amount * t.tax / t.total : 0;
            g.paymentCount++;
            g.clients[client.name] = (g.clients[client.name] || 0) + p.amount;
            payments.push({ ...p, number: d.number, currency, client: client.name });
          }
        }
        for (const e of db.expenses.filter((e2) => within(e2.date))) {
          const currency = e.currency || db.settings.currency;
          group(currency).expenses += e.amount;
          expenses.push({ ...e, currency });
        }
        if (!Object.keys(groups).length) group(db.settings.currency);
        for (const g of Object.values(groups)) {
          for (const key of ["revenue", "expenses", "tax"]) g[key] = roundCurrency(g[key], g.currency);
          g.net = roundCurrency(g.revenue - g.expenses, g.currency);
          for (const name in g.clients) g.clients[name] = roundCurrency(g.clients[name], g.currency);
        }
        return { start, end, groups: Object.values(groups), payments, expenses };
      }
      function reportRows(r) {
        return [["Report start", r.start], ["Report end", r.end], ["Accounting basis", "Cash; reversed payments excluded"], [], ["Currency", "Collected", "Expenses", "Net income", "Tax collected"], ...r.groups.map((g) => [g.currency, g.revenue, g.expenses, g.net, g.tax]), [], ["Type", "Date", "Document / description", "Client", "Amount", "Currency", "Method"], ...r.payments.map((p) => ["Payment", p.date, "Invoice " + p.number, p.client, p.amount, p.currency, p.method]), ...r.expenses.map((e) => ["Expense", e.date, e.name, "", -e.amount, e.currency, ""])];
      }
      let localIdSequence = 0;
      function createId() {
        const crypto = root.crypto;
        if (typeof crypto?.randomUUID === "function") return crypto.randomUUID();
        if (typeof crypto?.getRandomValues === "function") {
          const bytes = crypto.getRandomValues(new Uint8Array(16));
          bytes[6] = bytes[6] & 15 | 64;
          bytes[8] = bytes[8] & 63 | 128;
          const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
          return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
        }
        return `local-${Date.now().toString(36)}-${(++localIdSequence).toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
      }
      function validDate(value) {
        if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
        const d = /* @__PURE__ */ new Date(value + "T12:00:00Z");
        return !Number.isNaN(d.valueOf()) && d.toISOString().slice(0, 10) === value;
      }
      function totals(doc) {
        const currency = currencyOf(doc), r = (n) => roundCurrency(n, currency);
        const subtotal = r(doc.items.reduce((s, i) => s + r(i.qty * i.rate), 0));
        const discount = r(Math.min(subtotal, Number(doc.discount) || 0));
        const tax = r((subtotal - discount) * (Number(doc.tax) || 0) / 100);
        const total = r(subtotal - discount + tax);
        const paid = r((doc.payments || []).filter((p) => !p.reversed).reduce((s, p) => s + p.amount, 0));
        return { subtotal, discount, tax, total, paid, balance: r(total - paid) };
      }
      function status(doc, today) {
        if (doc.status === "Void" || doc.status === "Draft") return doc.status;
        const t = totals(doc);
        if (t.balance <= 0) return "Paid";
        if (doc.due < today) return "Overdue";
        if (t.paid > 0) return "Partial";
        return "Open";
      }
      function validate(doc) {
        if (doc.currency && !validCurrency(doc.currency)) throw Error("Choose a supported currency.");
        if (!doc.clientId) throw Error("Choose a client.");
        if (!validDate(doc.date) || !validDate(doc.due) || doc.due < doc.date) throw Error("Due date must be on or after the issue date.");
        if (!Array.isArray(doc.items) || !doc.items.length || doc.items.some((i) => typeof i.name !== "string" || !i.name.trim() || !Number.isFinite(i.qty) || i.qty <= 0 || i.qty > 1e5 || !Number.isFinite(i.rate) || i.rate < 0 || i.rate > 1e7)) throw Error("Add an item with a name, positive quantity, and valid rate.");
        if (!Number.isFinite(doc.tax) || doc.tax < 0 || doc.tax > 100 || !Number.isFinite(doc.discount) || doc.discount < 0 || doc.discount > totals(doc).subtotal) throw Error("Check the tax rate and discount.");
        for (const item of doc.items) {
          for (const [key, max] of [["unit", 40], ["category", 80], ["description", 2e3], ["sku", 80]]) if (item[key] !== void 0 && (typeof item[key] !== "string" || item[key].length > max)) throw Error("Check the item details.");
          if (item.type !== void 0 && !["product", "service"].includes(item.type)) throw Error("Choose a valid item type.");
        }
        if (!Number.isFinite(totals(doc).total) || totals(doc).total <= 0) throw Error("The total must be greater than zero.");
      }
      function payment(doc, p, today) {
        if (doc.publicUrl && !p.providerVerified) throw Error("This invoice is published online. Refresh its verified provider status instead of recording a manual payment.");
        if (doc.status !== "Open") throw Error("Issue the invoice before recording a payment.");
        if (!Number.isFinite(p.amount) || p.amount !== roundCurrency(p.amount, currencyOf(doc)) || p.amount <= 0 || p.amount > totals(doc).balance) throw Error("Payment must be positive, use the currency\uFFFDs supported precision, and cannot exceed the balance.");
        if (!validDate(p.date) || p.date < doc.date || p.date > today) throw Error("Payment date must fall between the issue date and today.");
        doc.payments.push(p);
      }
      function reversePayment(doc, id, reason) {
        if (doc.publicUrl) throw Error("Published online payments must be reconciled with the provider before correction.");
        const p = doc.payments.find((p2) => p2.id === id);
        if (!p || p.reversed) throw Error("This payment is unavailable or already reversed.");
        if (typeof reason !== "string" || !reason.trim()) throw Error("Enter a reason for this correction.");
        p.reversed = true;
        p.reversalReason = reason.trim();
      }
      function validateBackup(v) {
        const bad = () => {
          throw Error("This is not a valid Invoingo backup.");
        };
        if (v.version !== 1 || !v.settings || !["clients", "invoices", "estimates", "expenses", "services"].every((k) => Array.isArray(v[k])) || !validCurrency(v.settings.currency)) bad();
        for (const key of ["name", "email", "phone", "address", "note", "instructions"]) if (typeof v.settings[key] !== "string") bad();
        if (!Number.isFinite(v.settings.tax) || v.settings.tax < 0 || v.settings.tax > 100 || !Number.isInteger(v.settings.terms) || v.settings.terms < 0 || v.settings.terms > 365) bad();
        for (const kind of ["clients", "invoices", "estimates", "expenses", "services"]) {
          const ids = /* @__PURE__ */ new Set();
          for (const record of v[kind]) {
            if (typeof record.id !== "string" || !/^[a-zA-Z0-9-]+$/.test(record.id) || ids.has(record.id)) bad();
            ids.add(record.id);
          }
        }
        for (const c of v.clients) if (!["name", "email", "phone", "address"].every((k) => typeof c[k] === "string")) bad();
        for (const kind of ["invoices", "estimates"]) {
          const nums = /* @__PURE__ */ new Set();
          for (const d of v[kind]) {
            if (!Number.isInteger(d.number) || nums.has(d.number) || !v.clients.some((c) => c.id === d.clientId) || !Array.isArray(d.items) || !Array.isArray(d.payments) || !Array.isArray(d.activity) || typeof d.note !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(d.date) || !/^\d{4}-\d{2}-\d{2}$/.test(d.due)) bad();
            nums.add(d.number);
            validate(d);
            if (d.activity.some((a) => typeof a.text !== "string" || typeof a.date !== "string")) bad();
            for (const snapshot of [d.clientSnapshot, d.businessSnapshot]) if (snapshot && typeof snapshot.name !== "string") bad();
            if (!(kind === "invoices" ? ["Draft", "Open", "Void"] : ["Draft", "Sent", "Accepted", "Declined", "Converted"]).includes(d.status)) bad();
            if (d.payments.some((p) => !Number.isFinite(p.amount) || p.amount <= 0 || !validDate(p.date) || p.date < d.date || p.amount !== roundCurrency(p.amount, d.currency || d.businessSnapshot?.currency || v.settings.currency) || typeof p.method !== "string" || typeof p.id !== "string" || !/^[a-zA-Z0-9-]+$/.test(p.id) || p.reversed !== void 0 && typeof p.reversed !== "boolean") || totals(d).balance < 0 || new Set(d.payments.map((p) => p.id)).size !== d.payments.length || (kind === "estimates" || d.status === "Draft") && d.payments.length || d.status === "Void" && d.payments.some((p) => !p.reversed)) bad();
          }
          const counter = kind === "invoices" ? v.nextInvoice : v.nextEstimate;
          if (!Number.isInteger(counter) || counter <= Math.max(0, ...nums)) bad();
        }
        for (const e of v.expenses) {
          if (typeof e.name !== "string" || typeof e.category !== "string" || typeof e.note !== "string" || !validDate(e.date) || !Number.isFinite(e.amount) || e.amount <= 0) bad();
          if (e.receipt && (!["image/png", "image/jpeg", "image/webp", "application/pdf"].includes(e.receipt.type) || typeof e.receipt.name !== "string" || typeof e.receipt.data !== "string" || !/^data:(image\/(png|jpeg|webp)|application\/pdf);base64,[A-Za-z0-9+/=]+$/.test(e.receipt.data))) bad();
        }
        if (v.settings.industry !== void 0 && (typeof v.settings.industry !== "string" || v.settings.industry && !Catalog.get(v.settings.industry))) bad();
        if (v.settings.industries !== void 0 && (!Array.isArray(v.settings.industries) || v.settings.industries.some((id) => !Catalog.get(id)))) bad();
        if (v.settings.customIndustry !== void 0 && (typeof v.settings.customIndustry !== "string" || v.settings.customIndustry.length > 120)) bad();
        for (const s of v.services) {
          if (s.type === void 0) {
            if (typeof s.name !== "string" || typeof s.unit !== "string" || !Number.isFinite(s.rate) || s.rate < 0) bad();
          } else Catalog.validate(s);
        }
      }
      const api2 = { currencies, validCurrency, currencyOf, currencyDigits, roundCurrency, formatMoney, currencyOptions, initializeCurrency, toProviderAmount, fromProviderAmount, reportRange, report, reportRows, createId, validateBackup, round, validDate, totals, status, validate, payment, reversePayment };
      if (typeof module !== "undefined") module.exports = api2;
      else root.Business = api2;
    })(typeof window !== "undefined" ? window : globalThis);
  }
});

// invoice-assistant.js
var require_invoice_assistant = __commonJS({
  "invoice-assistant.js"(exports, module) {
    (function(root) {
      "use strict";
      const B2 = typeof module !== "undefined" ? require_domain() : root.Business;
      const isRequest = (text) => /\b(?:create|make|generate|prepare|draft|build)\s+(?:(?:me|a|an|new|the|please)\s+){0,4}(?:invoice|bill)\b/i.test(text) || /^invoice\s+.+\s+for\s+/i.test(text);
      function number(value) {
        const s = String(value).trim();
        if (/^\d{1,3}(,\d{3})+(\.\d+)?$/.test(s)) return Number(s.replaceAll(",", ""));
        if (/^\d+,\d{1,3}$/.test(s)) return Number(s.replace(",", "."));
        return Number(s);
      }
      function propose(db, text, today, extracted) {
        const help = (message) => ({ intent: "invoice-create", text: message, cards: [], context: { ids: [] } }), q = text.toLowerCase();
        const named = extracted?.clientName?.trim().toLowerCase();
        let matches = db.clients.filter((c) => named ? c.name.toLowerCase() === named : q.includes(c.name.toLowerCase()));
        if (named && !matches.length) matches = db.clients.filter((c) => c.name.toLowerCase().includes(named) && q.includes(named));
        if (matches.length !== 1) return help("Please name one saved customer exactly. Add a new customer in Clients first, then ask: \u201CCreate an invoice for Maya Chen for 2 logo designs at 150 each\u201D.");
        const client = matches[0];
        let item = extracted?.itemName, quantity = extracted?.quantity ?? 1, price = extracted?.unitPrice;
        const at = q.indexOf(client.name.toLowerCase());
        let suffix = text.slice(at >= 0 ? at + client.name.length : 0).trim();
        let currency = extracted?.currency || db.settings.currency;
        if (!extracted) {
          const codes = suffix.toUpperCase().match(/\b[A-Z]{3}\b/g) || [];
          currency = codes.find(B2.validCurrency) || db.settings.currency;
          const rates = [...suffix.matchAll(/(?:\bat\b|\bfor\b|@|\bprice\b|\brate\b)\s*(?:[A-Z]{3}\s*)?[$€£¥₹₦₵₱₩]?\s*(-?\d[\d,.]*)/gi)];
          const rate = rates.at(-1);
          if (!rate) return help("What is the item and its unit price? For example: \u201CCreate an invoice for " + client.name + " for 2 design sessions at 150 each\u201D.");
          price = number(rate[1]);
          item = suffix.slice(0, rate.index).replace(/^[\s,:;-]*(?:for\b|to\b)?\s*/i, "").trim();
          const count = item.match(/^(\d+(?:[.,]\d+)?)\s*(?:x\s+|×\s*|\s+)/i);
          if (count) {
            quantity = number(count[1]);
            item = item.slice(count[0].length).trim();
          }
          const symbols = { "\u20AC": "EUR", "\xA3": "GBP", "\u20B9": "INR", "\u20A6": "NGN", "\u20B5": "GHS", "\u20B1": "PHP", "\u20A9": "KRW" };
          for (const symbol in symbols) if (suffix.includes(symbol)) currency = symbols[symbol];
        }
        if (extracted) {
          const mentioned = (text.match(/-?\d[\d,.]*/g) || []).map(number);
          if (!mentioned.includes(price) || quantity !== 1 && !mentioned.includes(quantity) || !q.includes(String(item || "").toLowerCase())) return help("I could not verify the item, quantity and price from your request. Please state them explicitly; I will not guess financial details.");
        }
        if (currency !== db.settings.currency) return help(`This workspace invoices in ${db.settings.currency}. The requested ${currency} is different; I will not convert or relabel your amounts. Choose the business currency before creating financial records.`);
        if (typeof item !== "string" || !item.trim() || item.length > 160 || !Number.isFinite(price) || price < 0 || price > 1e7 || !Number.isFinite(quantity) || quantity <= 0 || quantity > 1e5) return help("Please provide a clear item, positive quantity and valid non-negative unit price.");
        const requestedDue = text.match(/\bdue(?:\s+on)?\s+(\d{4}-\d{2}-\d{2})/i)?.[1];
        const due = requestedDue || new Date(Date.parse(today + "T12:00:00Z") + db.settings.terms * 864e5).toISOString().slice(0, 10);
        if (!B2.validDate(due) || due < today) return help("Please use a valid due date on or after today, in YYYY-MM-DD format.");
        const proposal = { clientId: client.id, clientName: client.name, currency, date: today, due, items: [{ name: item.trim(), qty: quantity, rate: price, unit: "item", type: "service" }], tax: db.settings.tax, discount: 0, note: db.settings.note };
        const totals = B2.totals(proposal);
        return { intent: "invoice-create", title: "Review your invoice draft", text: `Draft for ${client.name}: ${quantity} \xD7 ${item.trim()} at ${B2.formatMoney(price, currency)} each. Total ${B2.formatMoney(totals.total, currency)}, including the workspace tax setting. Review below, then create and edit the draft. Nothing has been issued or emailed.`, proposal, cards: [], context: { ids: [] } };
      }
      function create(db, p, today, id = B2.createId) {
        if (!p || !db.clients.some((c) => c.id === p.clientId) || p.currency !== db.settings.currency) throw Error("The customer or business currency changed. Generate the draft again.");
        const doc = { id: id(), number: db.nextInvoice, clientId: p.clientId, currency: p.currency, date: p.date, due: p.due, items: structuredClone(p.items), tax: p.tax, discount: p.discount, note: p.note || "", status: "Draft", payments: [], activity: [{ text: "Invoice draft created with MioBot after review", date: today + "T12:00:00Z" }] };
        B2.validate(doc);
        db.nextInvoice++;
        db.invoices.push(doc);
        return doc;
      }
      const api2 = { isRequest, propose, create, number };
      if (typeof module !== "undefined") module.exports = api2;
      else root.InvoiceAssistant = api2;
    })(typeof window !== "undefined" ? window : globalThis);
  }
});

// miobot-core.js
var require_miobot_core = __commonJS({
  "miobot-core.js"(exports, module) {
    (function(root) {
      "use strict";
      const B2 = typeof module !== "undefined" ? require_domain() : root.Business;
      const A = typeof module !== "undefined" ? require_invoice_assistant() : root.InvoiceAssistant;
      const day = (a, b) => Math.floor((Date.parse(b + "T12:00:00Z") - Date.parse(a + "T12:00:00Z")) / 864e5);
      const addDays = (d, n) => new Date(Date.parse(d + "T12:00:00Z") + n * 864e5).toISOString().slice(0, 10);
      const money = (n, c = "USD") => new Intl.NumberFormat("en-US", { style: "currency", currency: c }).format(n);
      function facts(db, today) {
        return db.invoices.map((d) => {
          const t = B2.totals(d), c = d.clientSnapshot || db.clients.find((c2) => c2.id === d.clientId);
          return { id: d.id, number: d.number, clientId: d.clientId, client: c?.name || "Unavailable customer", email: c?.email || "", currency: d.businessSnapshot?.currency || db.settings.currency, due: d.due, date: d.date, status: d.collectionHold ? "Review" : B2.status(d, today), collectionHold: !!d.collectionHold, daysOverdue: Math.max(0, day(d.due, today)), total: t.total, balance: t.balance, paid: t.paid, payments: (d.payments || []).filter((p) => !p.reversed), paymentLink: /^https:\/\//.test(d.publicUrl || "") ? d.publicUrl : "", lastReminder: (d.reminders || []).filter((r) => r.status === "sent").at(-1) || null };
        });
      }
      function grouped(rows, key) {
        const groups = {};
        for (const r of rows) groups[r.currency] = B2.roundCurrency((groups[r.currency] || 0) + r[key], r.currency);
        return groups;
      }
      const amounts = (groups, currency = "USD") => Object.entries(groups).map(([c, n]) => money(n, c)).join(" + ") || money(0, currency);
      function snapshot(db, today) {
        const rows = facts(db, today), open = rows.filter((r) => !["Paid", "Draft", "Void"].includes(r.status) && r.balance > 0), overdue = open.filter((r) => r.daysOverdue > 0), payments = rows.filter((r) => r.status !== "Void").flatMap((r) => r.payments.map((p) => ({ ...p, currency: r.currency, invoiceId: r.id, number: r.number, client: r.client })));
        return { outstanding: grouped(open, "balance"), overdue: grouped(overdue, "balance"), openCount: open.length, overdueCount: overdue.length, dueThisWeek: grouped(open.filter((r) => r.due >= today && r.due <= addDays(today, 6)), "balance"), collectedMonth: grouped(payments.filter((p) => p.date.startsWith(today.slice(0, 7))), "amount"), paymentsThisWeek: payments.filter((p) => p.date >= addDays(today, -6) && p.date <= today).length, attention: overdue.sort((a, b) => b.daysOverdue - a.daysOverdue), recentPayments: payments.sort((a, b) => b.date.localeCompare(a.date)).slice(0, 10) };
      }
      function query(db, text, context = {}, today) {
        if (!B2.validDate(today)) throw Error("A valid business date is required.");
        text = String(text || "").trim();
        if (!text || text.length > 2e3) throw Error("Ask a question of up to 2,000 characters.");
        if (A.isRequest(text)) return A.propose(db, text, today);
        const q = text.toLowerCase().replace(/[’]/g, "'"), all = facts(db, today), previous = all.filter((r) => (context.ids || []).includes(r.id));
        let rows = all.filter((r) => !["Draft", "Void"].includes(r.status)), title = "Invoices", reply = "", intent = "list";
        const number = q.match(/(?:#|inv[- ]?|invoice\s*#?)(\d+)/), client = db.clients.find((c) => c.name && q.includes(c.name.toLowerCase()));
        const refer = /\b(them|they|those|these|ones|first|that|one owes|only|their)\b/.test(q);
        if (refer && previous.length) rows = previous;
        if (number) rows = rows.filter((r) => r.number === Number(number[1]));
        else if (client) rows = rows.filter((r) => r.clientId === client.id);
        if (/\b(?:draft|prepare|write|create)\b.*\b(?:update|status email)\b/.test(q)) return { intent: "draft", kind: "update", ids: rows.map((r) => r.id), text: "I prepared customer status-update drafts. Review the recipient and message before sending.", cards: [], context: { ids: rows.map((r) => r.id) } };
        if (/\b(send it|send them|send reminder|send the reminder)\b/.test(q)) return { intent: "review", title: "Review before sending", text: "Open the reminder draft, check the recipient and message, then tap Send. I never send a generated message without approval.", cards: [], context };
        if (/friendlier|firmer|shorten|make it (friendly|firm|short)/.test(q)) return { intent: "tone", tone: /firm/.test(q) ? "firm" : /short/.test(q) ? "short" : "friendly", text: "I can update your selected reminder. Review the revised message before sending.", cards: [], context };
        if (/remind me when|notify me when|when they pay/.test(q)) return { intent: "watch", ids: rows.filter((r) => r.balance > 0).map((r) => r.id), text: "Payment updates will appear in MioBot after a verified provider event or a recorded payment.", cards: rows.slice(0, 20), context: { ids: rows.map((r) => r.id) } };
        if (/last reminder|previous reminder/.test(q)) {
          title = "Reminder history";
          reply = rows.some((r) => r.lastReminder) ? "Here is the latest accepted reminder for each invoice." : "No accepted reminders are recorded for these invoices.";
        } else if (/came in|collected|received this month/.test(q)) {
          const s = snapshot(db, today);
          return { intent: "summary", title: "Collected this month", text: `${amounts(s.collectedMonth)} recorded in ${today.slice(0, 7)}. Reversed payments are excluded.`, snapshot: s, cards: [], context };
        } else if (/usually pays late|payment history/.test(q)) {
          rows = rows.filter((r) => r.payments.some((p) => p.date > r.due));
          title = "Payments recorded after the due date";
          reply = "These invoices have payments dated after their due date. This is a history view, not a prediction.";
        } else if (/partially|partial/.test(q)) {
          rows = rows.filter((r) => r.paid > 0 && r.balance > 0);
          title = "Partially paid";
        } else if (/\bpaid\b/.test(q) && !/unpaid|hasn't paid|haven't paid|has not paid|not (?:yet )?paid/.test(q)) {
          if (!number) rows = rows.filter((r) => r.status === "Paid");
          title = number ? "Invoice payment status" : "Paid invoices";
        } else if (/due today/.test(q)) {
          rows = rows.filter((r) => r.balance > 0 && r.due === today);
          title = "Due today";
        } else if (/due (this|next) week|due soon|due next/.test(q)) {
          rows = rows.filter((r) => r.balance > 0 && r.due >= today && r.due <= addDays(today, 6));
          title = "Due in the next seven days";
        } else if (/late|overdue|attention|follow up|ignored/.test(q)) {
          rows = rows.filter((r) => r.balance > 0 && r.daysOverdue > 0);
          title = "Overdue invoices";
          if (/ignored/.test(q)) {
            rows = rows.filter((r) => r.lastReminder);
            reply = "These invoices remain unpaid after a recorded reminder. This does not prove the customer ignored it.";
          }
        } else if (/owes|owe |open|unpaid|hasn't paid|haven't paid|has not paid|not (?:yet )?paid|outstanding/.test(q)) {
          rows = rows.filter((r) => r.balance > 0);
          title = "Open invoices";
        }
        const days = q.match(/(?:more than|over|older than)\s*(\d+)\s*days/);
        if (days) rows = rows.filter((r) => r.balance > 0 && r.daysOverdue > Number(days[1]));
        const value = q.match(/(?:over|above|more than)\s*\$\s*([\d,]+(?:\.\d{1,2})?)/);
        if (value) rows = rows.filter((r) => r.balance > Number(value[1].replaceAll(",", "")));
        if (/owes the most|largest|highest|biggest/.test(q)) {
          const currencies = new Set(rows.map((r) => r.currency));
          if (currencies.size > 1) return { intent: "list", title: "Choose a currency", text: "Balances in different currencies cannot be ranked without an exchange rate.", cards: rows.slice(0, 20), context: { ids: rows.map((r) => r.id) } };
          rows = rows.sort((a, b) => b.balance - a.balance).slice(0, 1);
        }
        const first = q.match(/first\s+(three|two|one|\d+)/);
        if (first) rows = rows.slice(0, { three: 3, two: 2, one: 1 }[first[1]] || Math.min(10, Number(first[1])));
        if (/draft|write.*reminder|remind (?!me)|follow-ups/.test(q)) {
          intent = "draft";
          rows = rows.filter((r) => r.balance > 0);
          title = "Review payment reminders";
          reply = "I prepared reminder drafts from current invoice records. Nothing has been sent.";
        }
        const recognized = number || client || refer || /paid|late|overdue|due |owe|open|outstanding|attention|reminder|follow|largest|highest|biggest|partial/.test(q) || value;
        if (!recognized) return { intent: "help", title: "Ask about your invoices", text: "Try \u201CWho\u2019s late?\u201D, \u201CWhat\u2019s due this week?\u201D, \u201CHow much is outstanding?\u201D or \u201CDraft a reminder for invoice #1042.\u201D I cannot verify facts outside your invoice records.", cards: [], context };
        if (!reply) reply = rows.length ? `${rows.length} ${title.toLowerCase()} \xB7 ${amounts(grouped(rows, title === "Paid invoices" ? "paid" : "balance"))}.` : "You\u2019re all caught up. No invoices match this question.";
        return { intent, title, text: reply, cards: rows.slice(0, 40), ids: rows.map((r) => r.id), context: { ids: rows.map((r) => r.id) }, asOf: today };
      }
      function reminder(db, id, today, tone) {
        const doc = db.invoices.find((d) => d.id === id);
        if (doc?.collectionHold) throw Error("Collections are paused for this invoice. Resolve its refund or dispute first.");
        const r = facts(db, today).find((r2) => r2.id === id);
        if (!r || !r.email) throw Error("This invoice or customer email is unavailable.");
        if (["Draft", "Void", "Paid"].includes(r.status) || r.balance <= 0) throw Error("Only issued, unpaid invoices can receive reminders.");
        tone = tone || (r.daysOverdue > 30 ? "firm" : r.daysOverdue > 7 ? "professional" : "friendly");
        if (!["friendly", "professional", "firm", "short", "custom"].includes(tone)) throw Error("Choose a supported tone.");
        const amount = money(r.balance, r.currency), when = r.daysOverdue ? `was due on ${r.due}` : `is due on ${r.due}`, name = db.settings.name, link = r.paymentLink ? `

Review your invoice: ${r.paymentLink}` : "";
        let text = `Hi ${r.client},

${tone === "firm" ? "Please arrange payment for" : tone === "friendly" ? "Just a friendly reminder about" : "A payment reminder for"} invoice INV-${r.number}. The remaining balance is ${amount} and ${when}.${tone === "firm" ? " Please let us know when we can expect payment, or contact us if there is an issue." : ""}

If you have already submitted payment, please let us know so we can reconcile our records.${link}

Thank you,
${name}`;
        if (tone === "short") text = `Hi ${r.client}, invoice INV-${r.number} has a remaining balance of ${amount} and ${when}. Please let us know if payment is already on its way.${link}
Thank you, ${name}`;
        return { invoiceId: id, to: r.email, subject: `Payment reminder \xB7 INV-${r.number}`, text, tone, fingerprint: JSON.stringify([r.id, r.balance, r.due, r.email, r.currency, r.paymentLink]), status: "draft", generated: true };
      }
      function customerUpdate(db, invoiceId, today) {
        const r = facts(db, today).find((r2) => r2.id === invoiceId);
        if (!r || ["Draft", "Void"].includes(r.status)) throw Error("Choose an issued invoice for a customer update.");
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r.email)) throw Error("Save a valid customer email first.");
        return { kind: "update", invoiceId, to: r.email, subject: `Invoice update \xB7 INV-${r.number}`, text: `Hi ${r.client},

Here is an update on invoice INV-${r.number} from ${db.settings.name}. ${r.balance <= 0 ? "The invoice is paid in full. Thank you." : `The current remaining balance is ${money(r.balance, r.currency)}, due ${r.due}.`}${r.paymentLink ? "\nView your invoice: " + r.paymentLink : ""}

Please contact us if you have questions.
${db.settings.name}`, tone: "professional", fingerprint: JSON.stringify([r.id, r.balance, r.due, r.email, r.currency, r.paymentLink, "update"]), status: "draft", generated: true };
      }
      const api2 = { customerUpdate, invoiceRequest: A.isRequest, proposeInvoice: A.propose, createInvoice: A.create, day, addDays, money, facts, grouped, amounts, snapshot, query, reminder };
      if (typeof module !== "undefined") module.exports = api2;
      else root.MioCore = api2;
    })(typeof window !== "undefined" ? window : globalThis);
  }
});

// documents.js
var require_documents = __commonJS({
  "documents.js"(exports, module) {
    (function(root) {
      "use strict";
      const B2 = typeof module !== "undefined" ? require_domain() : root.Business;
      const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
      function publicLink(value) {
        try {
          const u = new URL(value);
          if (u.protocol !== "https:" || u.username || u.password || /^(localhost|127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(u.hostname)) return "";
          return u.href;
        } catch {
          return "";
        }
      }
      function details(data) {
        const { doc, business, client } = data, currency = doc.currency || doc.businessSnapshot?.currency || business.currency;
        return { doc, business, client, currency, total: B2.totals({ ...doc, currency }), label: data.receipt ? "Receipt" : data.kind === "estimate" ? "Estimate" : "Invoice" };
      }
      function text(data) {
        const { doc, business, client, currency, total: t, label } = details(data), money = (n) => B2.formatMoney(n, currency, "en");
        return `${data.demo ? "SAMPLE DOCUMENT \xB7 FICTIONAL DATA\n" : ""}${label} #${doc.number || "DRAFT"}${doc.status === "Draft" ? " \xB7 DRAFT" : ""}
${business.name}
${business.email || ""}
Bill to: ${client.name}
Issued: ${doc.date}
Due: ${doc.due}
Currency: ${currency}

${doc.items.map((i) => `${i.name}: ${i.qty} \xD7 ${money(i.rate)} = ${money(B2.roundCurrency(i.qty * i.rate, currency))}`).join("\n")}

Subtotal: ${money(t.subtotal)}
Discount: ${money(t.discount)}
Tax: ${money(t.tax)}
Total: ${money(t.total)}
Paid: ${money(t.paid)}
Balance: ${money(t.balance)}${data.receipt ? `
Payment received: ${money(data.receipt.amount)} on ${data.receipt.date} (${data.receipt.method})` : ""}

${doc.note || ""}
${business.instructions || ""}${publicLink(doc.publicUrl) ? "\nView online: " + publicLink(doc.publicUrl) : ""}`;
      }
      function html(data) {
        const { doc, business, client, currency, total: t, label } = details(data), money = (n) => esc(B2.formatMoney(n, currency));
        const rows = [["Subtotal", t.subtotal], ["Discount", -t.discount], [`Tax (${doc.tax}%)`, t.tax], ["Total", t.total], ["Paid", t.paid], ["Balance due", t.balance]];
        return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${label} ${esc(doc.number || "Draft")}</title><style>@page{margin:32px}*{box-sizing:border-box}body{font:14px/1.6 -apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;color:#163300;padding:24px;max-width:850px;margin:auto}header{border-bottom:3px solid #163300;padding-bottom:20px;display:flex;justify-content:space-between;gap:20px}h1{margin:0;font-size:30px}h2{margin:0 0 8px}p{white-space:pre-line}table{border-collapse:collapse;width:100%;margin:24px 0}td,th{text-align:left;padding:12px 8px;border-bottom:1px solid #dce2d6;overflow-wrap:anywhere}td:last-child,th:last-child{text-align:right}thead{display:table-header-group}tr{break-inside:avoid}.totals{max-width:350px;margin-left:auto}.totals p{display:flex;justify-content:space-between}.badge{background:#e2f6d5;padding:10px}.note{font-size:12px;color:#56624e}footer{margin-top:36px;border-top:1px solid #ddd;padding-top:14px}</style></head><body>${data.demo ? '<p class="badge">SAMPLE DOCUMENT \xB7 FICTIONAL DATA \xB7 NOT A REAL PAYMENT REQUEST</p>' : ""}<header><div><h2>${esc(business.name)}</h2><div>${esc(business.email)}</div><div>${esc(business.phone)}</div><div>${esc(business.address)}</div></div><div><h1>${label.toUpperCase()}</h1><b>#${esc(doc.number || "DRAFT")}</b>${doc.status === "Draft" ? "<div>DRAFT \xB7 NOT ISSUED</div>" : ""}</div></header><p><b>Bill to</b><br>${esc(client.name)}<br>${esc(client.email)}<br>${esc(client.address)}</p><p>Issued ${esc(doc.date)} \xB7 Due ${esc(doc.due)} \xB7 ${esc(currency)}</p><table><thead><tr><th>Item</th><th>Quantity</th><th>Unit price</th><th>Amount</th></tr></thead><tbody>${doc.items.map((i) => `<tr><td>${esc(i.name)}</td><td>${esc(i.qty)} ${esc(i.unit || "")}</td><td>${money(i.rate)}</td><td>${money(B2.roundCurrency(i.qty * i.rate, currency))}</td></tr>`).join("")}</tbody></table><div class="totals">${rows.map(([label2, amount]) => `<p><span>${esc(label2)}</span><strong>${money(amount)}</strong></p>`).join("")}</div>${data.receipt ? `<p class="badge">Payment received: ${money(data.receipt.amount)} \xB7 ${esc(data.receipt.date)} \xB7 ${esc(data.receipt.method)}</p>` : ""}<p>${esc(doc.note)}</p><p>${esc(business.instructions)}</p>${publicLink(doc.publicUrl) ? `<p><a href="${esc(publicLink(doc.publicUrl))}">View your invoice online</a></p>` : ""}<footer class="note">Prepared with Invoingo. ${data.demo ? "Sample document." : "Keep this document for your records."}</footer></body></html>`;
      }
      async function share(data, channel = "share") {
        const title = `${data.kind === "estimate" ? "Estimate" : "Invoice"} #${data.doc.number || "Draft"}`, body = text(data);
        if (root.ReactNativeWebView) {
          root.ReactNativeWebView.postMessage(JSON.stringify({ type: "invoingo.document", action: channel, html: html(data), title, text: body, recipients: data.demo ? [] : [data.client.email].filter(Boolean), demo: !!data.demo }));
          return;
        }
        if (channel === "mail") {
          root.location.href = `mailto:${encodeURIComponent(data.demo ? "" : data.client.email || "")}?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`;
          return;
        }
        if (channel === "whatsapp") {
          root.open("https://wa.me/?text=" + encodeURIComponent(body), "_blank", "noopener,noreferrer");
          return;
        }
        if (channel === "sms") {
          root.location.href = `sms:${data.demo ? "" : String(data.client.phone || "").replace(/[^+0-9]/g, "")}?body=${encodeURIComponent(body)}`;
          return;
        }
        if (channel === "share" && typeof root.navigator?.share === "function") {
          try {
            await root.navigator.share({ title, text: body });
          } catch (e) {
            if (e.name !== "AbortError") throw e;
          }
          return;
        }
        const w = root.open("", "_blank");
        if (!w) throw Error("Allow pop-ups to open the printable document, or use your phone\u2019s native Share PDF button.");
        w.document.write(html(data));
        w.document.close();
        w.addEventListener("load", () => w.print(), { once: true });
      }
      async function copy(value) {
        if (root.navigator?.clipboard?.writeText) {
          try {
            await root.navigator.clipboard.writeText(value);
            return true;
          } catch {
          }
        }
        const t = document.createElement("textarea");
        t.value = value;
        t.style.cssText = "position:fixed;top:0;left:0;opacity:0";
        document.body.append(t);
        t.focus();
        t.select();
        const ok = document.execCommand("copy");
        t.remove();
        return ok;
      }
      const api2 = { publicLink, text, html, share, copy, details };
      if (typeof module !== "undefined") module.exports = api2;
      else root.InvoingoDocuments = api2;
    })(typeof window !== "undefined" ? window : globalThis);
  }
});

// cloud-runtime.cjs
var require_cloud_runtime = __commonJS({
  "cloud-runtime.cjs"(exports, module) {
    var B2 = require_domain();
    var Core2 = require_miobot_core();
    var Documents2 = require_documents();
    function reconcileWorkspace2(incoming, current, publications, base) {
      B2.validateBackup(incoming);
      const db = structuredClone(incoming);
      for (const d of [...db.invoices, ...db.estimates]) {
        const old = current?.invoices?.find((x) => x.id === d.id);
        const record = publications.find((r) => r.id === d.id);
        if (record) {
          const source = record.payload.doc;
          const stable = (x) => JSON.stringify([x.number, x.clientId, x.date, x.due, x.items, x.tax, x.discount, x.status, x.currency || x.businessSnapshot?.currency]);
          if (stable({ ...source, currency: record.payload.business.currency }) !== stable({ ...d, currency: d.currency || db.settings.currency })) throw Error("Published invoice details cannot be changed.");
          d.payments = structuredClone(source.payments || []);
          if (record.payment && !d.payments.some((p) => p.id === record.payment.id)) d.payments.push(record.payment);
          d.publicUrl = base + "/pay.html?token=" + record.token;
          if (record.collection_hold) d.collectionHold = record.collection_hold;
          d.reminders = old?.reminders || [];
        } else {
          if (d.publicUrl || d.payments.some((p) => p.providerVerified)) throw Error("Payment links and provider payments must be verified by the server.");
        }
      }
      for (const r of publications) if (!db.invoices.some((d) => d.id === r.id)) throw Error("Published invoices cannot be removed through workspace sync.");
      return db;
    }
    module.exports = { B: B2, Core: Core2, Documents: Documents2, reconcileWorkspace: reconcileWorkspace2 };
  }
});

// cloud-runtime.entry.mjs
var import_cloud_runtime = __toESM(require_cloud_runtime(), 1);
var { B, Core, Documents, reconcileWorkspace } = import_cloud_runtime.default;
export {
  B,
  Core,
  Documents,
  reconcileWorkspace
};
