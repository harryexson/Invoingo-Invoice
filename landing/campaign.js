(() => {
  const journeys = [
    [['setup','Make it yours.','Your logo, business details and industry.'],['home','See what’s next.','Balances, due dates and every invoice.'],['activity','Stay in the loop.','Follow invoice and payment activity.']],
    [['editor','Build your invoice.','Items, tax, discounts and project details.'],['additem','Add the good stuff.','Saved services or a new product.'],['billto','Choose your client.','Your people, ready when you need them.']],
    [['preview','Give it your style.','Templates, colors and a printable preview.'],['send','Send it your way.','Email, text, WhatsApp, link or QR.'],['tracking','Keep tabs on it.','A clear timeline from sent to settled.']],
    [['pay','Make paying simple.','A clear invoice and hosted checkout.'],['payment','Record what comes in.','Full or partial payments with a balance.'],['paid','Enjoy a great finish.','A payment record you can come back to.']],
    [['estimates','Start with a yes.','Turn agreed estimates into invoices.'],['expenses','Keep costs in view.','Capture receipts and record expenses.'],['reports','See the bigger picture.','Income, expenses, tax and top clients.']]
  ];
  const stage = document.querySelector('#tour-stage');
  let journey = 0, platform = 'ios';
  // Render at a real phone width, then scale the whole screen into its frame.
  // Narrow showcase frames must not force desktop-sized controls into 240px.
  const frameObserver = new ResizeObserver(entries => entries.forEach(({target}) => fitFrame(target)));
  function fitFrame(frame) {
    const scale = frame.clientWidth / 390;
    if (!scale) return;
    frame.style.setProperty('--tour-scale', scale);
    frame.querySelector('iframe').style.height = `${frame.clientHeight / scale}px`;
  }
  function renderTour() {
    frameObserver.disconnect();
    stage.dataset.platform = platform;
    stage.setAttribute('aria-labelledby',`journey-tab-${journey}`);
    stage.innerHTML = journeys[journey].map(([route,title,description]) => `<article class="tour-screen"><div class="tour-frame"><iframe src="/mobile.html?canvas=1&platform=${platform}#${route}" title="${title} mobile screen" loading="lazy" tabindex="-1" aria-hidden="true"></iframe></div><a href="/mobile.html?platform=${platform}#${route}">${title}<span aria-hidden="true">↗</span></a><p>${description}</p></article>`).join('');
    stage.querySelectorAll('.tour-frame').forEach(frame => {fitFrame(frame);frameObserver.observe(frame);});
  }
  document.querySelectorAll('[data-journey]').forEach((button,index,buttons) => {
    button.id = `journey-tab-${index}`;
    button.tabIndex = index === 0 ? 0 : -1;
    button.addEventListener('keydown',event => {
      let next;
      if(event.key==='ArrowRight')next=(index+1)%buttons.length;
      if(event.key==='ArrowLeft')next=(index+buttons.length-1)%buttons.length;
      if(event.key==='Home')next=0;
      if(event.key==='End')next=buttons.length-1;
      if(next!==undefined){event.preventDefault();buttons[next].click();buttons[next].focus();}
    });
    button.addEventListener('click',() => {
    journey = Number(button.dataset.journey);
    document.querySelectorAll('[data-journey]').forEach(b => {b.setAttribute('aria-selected',String(b === button));b.tabIndex=b===button?0:-1;});
    renderTour();
    });
  });
  document.querySelectorAll('[data-tour-platform]').forEach(button => button.addEventListener('click',() => {
    platform = button.dataset.tourPlatform;
    document.querySelectorAll('[data-tour-platform]').forEach(b => b.setAttribute('aria-pressed',String(b === button)));
    renderTour();
  }));
  renderTour();
  const hero = document.querySelector('.hero-art');
  const buttons = document.querySelectorAll('[data-step]');
  new MutationObserver(() => {
    const active = [...buttons].find(b => b.getAttribute('aria-pressed') === 'true');
    if (active) hero.dataset.state = active.dataset.step;
  }).observe(document.querySelector('.demo-steps'),{subtree:true,attributes:true,attributeFilter:['aria-pressed']});
})();
