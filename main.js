// ===== DATA =====
const products=[
  {id:1,name:'Eye Contour',sub:'Contorno de Ojos Regenerador',price:'68,00 €',num:68,color:'#847AB0',
   img:'assets/images/eyecontour1-hq.webp',img2:'assets/images/eyecontour2.webp',
   d1:'Formulado con extractos volcánicos ricos en silicio y minerales de La Palma, este contorno de ojos trata las manchas oscuras, bolsas y líneas de expresión con una eficacia excepcional. Su textura ultrafina se funde con la piel dejando una sensación de frescor y vitalidad inmediatos.',
   d2:'El packaging piramidal en vidrio soplado artesanalmente alberga una fórmula que combina lo mejor de la naturaleza volcánica con biotecnología avanzada. Genderless, sin fragancia añadida, apto para pieles sensibles.',
   ingr:['Agua Volcánica','Retinol Encapsulado','Ácido Hialurónico','Cafeína','Péptidos de Palma','Vitamina C','Alantoína','Jojoba Bio']},
  {id:2,name:'Facial Serum',sub:'Sérum Facial de Minerales Volcánicos',price:'92,00 €',num:92,color:'#BE9755',
   img:'assets/images/facialserum1-hq.webp',img2:'assets/images/facialserum2.webp',
   d1:'Nuestro sérum concentrado activa los mecanismos de regeneración celular gracias a una fórmula exclusiva a base de minerales volcánicos de La Palma. Rico en silicio, magnesio y oligoelementos que la lava ha sedimentado durante milenios.',
   d2:'De consistencia sedosa y absorción ultrrápida, se adapta a todo tipo de pieles. Formulado sin parabenos, sin colorantes artificiales y con materias primas de origen local y sostenible.',
   ingr:['Agua Termal Volcánica','Niacinamida 10%','Ácido Hialurónico Trifásico','Extracto de Lava','Vitamina E','Ceramidas','Resveratrol','Centella Asiática']},
  {id:3,name:'Active Mask',sub:'Mascarilla Activa Volcánica',price:'74,00 €',num:74,color:'#D86F2A',
   img:'assets/images/activemask1-hq.webp',img2:'assets/images/activemask2.webp',
   d1:'Una mascarilla de arcilla volcánica negra que purifica en profundidad, desintoxica los poros y equilibra la microbiota cutánea. Su fórmula combina arcilla volcánica de La Palma con extractos botánicos de flora canaria endémica.',
   d2:'Aplicar una vez a la semana durante 10-15 minutos sobre el rostro limpio y seco. La piel muestra una luminosidad inmediata y una textura visiblemente más fina. Formulada para todo tipo de pieles.',
   ingr:['Arcilla Volcánica Negra','Kaolín','Aloe Vera Bio','Aceite de Argán KM0','Salvia Canaria','Menta Piperita','Ácido Láctico','Zinc PCA']},
  {id:4,name:'Face Cream',sub:'Crema Facial Nutritiva Volcánica',price:'86,00 €',num:86,color:'#8CC581',
   img:'assets/images/facecream1-hq.webp',img2:'assets/images/facecream2.webp',
   d1:'La crema más rica de la gama. Una emulsión densa y nutritiva elaborada con mantecas vegetales y una alta concentración de activos volcánicos que reparan la barrera cutánea y aportan una hidratación profunda de larga duración.',
   d2:'Su fórmula transforma la piel desde la primera noche de uso. Al despertar, la piel aparece visiblemente más tersa, luminosa y nutrida. Un lujo sensorial nacido del volcán para tu ritual nocturno.',
   ingr:['Manteca de Kariété','Aceite de Squalane','Agua Mineral Volcánica','Péptidos Bioactivos','Ácido Hialurónico','Ceramidas NP','Extracto de Tabaiba','Proteínas de Seda']}
];

let cart=JSON.parse(localStorage.getItem('vulcan_cart')||'[]'),lastPage='home';

// ===== CURSOR =====
const cur=document.getElementById('cursor');
const ring=document.getElementById('cursorRing');
document.addEventListener('mousemove',e=>{
  cur.style.left=e.clientX+'px';
  cur.style.top=e.clientY+'px';
  ring.style.left=e.clientX+'px';
  ring.style.top=e.clientY+'px';
});

// ===== NAVBAR SCROLL =====
window.addEventListener('scroll',()=>{
  document.getElementById('navbar').classList.toggle('scrolled',window.scrollY>50);
},{passive:true});

// ===== MOBILE NAV =====
function toggleMob(){
  const overlay=document.getElementById('mobNav');
  const burger=document.getElementById('burger');
  const isOpen=overlay.classList.toggle('open');
  burger.classList.toggle('open',isOpen);
  document.body.style.overflow=isOpen?'hidden':'';
}
function closeMobNav(){
  document.getElementById('mobNav').classList.remove('open');
  document.getElementById('burger').classList.remove('open');
  document.body.style.overflow='';
}

// ===== ROUTING (hash-based) =====
const PAGES=['home','producto','manifiesto','contacto','privacidad','faq','trabaja'];
const PAGE_META={
  home:{title:'VULCAN — Volcano Science',desc:'Cosmética volcánica genderless nacida en La Palma. Formulada con ingredientes KM0 y elaborada artesanalmente.'},
  producto:{title:'La Gama — VULCAN Volcano Science',desc:'Eye Contour, Facial Serum, Active Mask y Face Cream. Cuatro fórmulas volcánicas, una filosofía.'},
  manifiesto:{title:'Manifiesto — VULCAN Volcano Science',desc:'Somos la fuerza de la naturaleza en su estado puro. La historia de VULCAN y su compromiso con La Palma.'},
  contacto:{title:'Contacto — VULCAN Volcano Science',desc:'Escríbenos. Respondemos en menos de 48 horas.'},
  privacidad:{title:'Privacidad — VULCAN',desc:'Política de privacidad de VULCAN Volcano Science.'},
  faq:{title:'FAQ — VULCAN Volcano Science',desc:'Preguntas frecuentes sobre los productos VULCAN.'},
  trabaja:{title:'Trabaja con Nosotros — VULCAN',desc:'Únete al equipo de VULCAN Volcano Science en La Palma.'}
};

function renderPage(page){
  if(!PAGES.includes(page)) page='home';
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  const el=document.getElementById('page-'+page);
  if(!el){renderPage('home');return;}
  el.classList.add('active');
  window.scrollTo(0,0);
  document.querySelectorAll('.nav-links a[data-page]').forEach(a=>{
    a.classList.toggle('active',a.dataset.page===page);
  });
  document.querySelectorAll('#mobNav a[data-mob-page]').forEach(a=>{
    a.classList.toggle('active',a.dataset.mobPage===page);
  });
  closeMobNav();
  lastPage=page;
  const newHash='#'+page;
  if(location.hash!==newHash) location.hash=page;
  const meta=PAGE_META[page]||PAGE_META.home;
  document.title=meta.title;
  let dm=document.querySelector('meta[name="description"]');
  if(!dm){dm=document.createElement('meta');dm.name='description';document.head.appendChild(dm);}
  dm.content=meta.desc;
  setTimeout(initReveal,80);
  setTimeout(runParallax,80);
}

function showPage(page){renderPage(page);}

window.addEventListener('hashchange',()=>{
  const page=location.hash.replace('#','').replace('/','') || 'home';
  renderPage(page);
});

// ===== PARALLAX JS =====
let pxRaf=false;
function runParallax(){
  document.querySelectorAll('[data-px]').forEach(block=>{
    const bg=block.querySelector('.px-bg,.mani-px-bg');
    if(!bg) return;
    const rect=block.getBoundingClientRect();
    const vh=window.innerHeight;
    if(rect.bottom<-50||rect.top>vh+50) return;
    // Cálculo: posición relativa del centro del bloque respecto al centro de la ventana
    const progress=(rect.top+rect.height/2-vh/2)/vh;
    bg.style.transform='translateY('+Math.round(progress*80)+'px)';
  });
}
window.addEventListener('scroll',()=>{
  if(!pxRaf){
    pxRaf=true;
    requestAnimationFrame(()=>{runParallax();pxRaf=false;});
  }
},{passive:true});

// ===== BUILD PRODUCTS =====
function buildProducts(){
  const grid=document.getElementById('productGrid');
  grid.innerHTML=products.map(p=>`
    <div class="pcard">
      <div class="pcard-img" onclick="openLb('${p.img}')">
        <img src="${p.img}" alt="${p.name}">
        <span class="pcard-zoom-hint">Ampliar imagen</span>
      </div>
      <div class="pcard-stripe" style="background:${p.color}"></div>
      <div class="pcard-body">
        <span class="pcard-tag" style="color:${p.color}">Volcano Science &middot; ${p.name}</span>
        <h2>${p.name}</h2>
        <p class="pcard-sub">${p.sub}</p>
        <p>${p.d1}</p>
        <div class="pcard-footer">
          <span class="pcard-price">${p.price}</span>
          <div class="pcard-actions">
            <button class="btn-detail" onclick="openModal(${p.id})">Ver Detalle</button>
            <button class="btn-add" style="background:${p.color}" onclick="addToCart(${p.id})">+ Carrito</button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

// ===== LIGHTBOX =====
function openLb(src){
  document.getElementById('lbImg').src=src;
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow='hidden';
}
function closeLb(e){
  if(e&&e.target&&e.target.tagName==='IMG') return;
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow='';
}

// ===== MODAL =====
function openModal(id){
  const p=products.find(x=>x.id===id);
  if(!p) return;
  document.getElementById('modalInner').innerHTML=`
    <div class="modal-img" onclick="openLb('${p.img2}')">
      <img src="${p.img2}" alt="${p.name}">
    </div>
    <div class="modal-body">
      <span class="modal-tag" style="color:${p.color}">Volcano Science</span>
      <h2>${p.name}</h2>
      <p class="modal-sub">${p.sub}</p>
      <p>${p.d1}</p>
      <p>${p.d2}</p>
      <div class="modal-ingr">
        <h4>Ingredientes Clave</h4>
        <div class="ingr-chips">${p.ingr.map(i=>`<span class="chip">${i}</span>`).join('')}</div>
      </div>
      <div class="modal-footer">
        <span class="modal-price">${p.price}</span>
        <button class="modal-add" style="background:${p.color}" onclick="addToCart(${p.id});closeModalDirect()">Añadir al Carrito</button>
      </div>
    </div>
  `;
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow='hidden';
}
function closeModalDirect(){
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow='';
}
document.getElementById('modalOverlay').addEventListener('click',e=>{
  if(e.target===document.getElementById('modalOverlay')) closeModalDirect();
});
document.getElementById('modalClose').addEventListener('click',closeModalDirect);

// ===== CARRITO =====
function addToCart(id){
  const p=products.find(x=>x.id===id);
  if(!p) return;
  const ex=cart.find(x=>x.id===id);
  if(ex) ex.qty++; else cart.push({...p,qty:1});
  saveCart();
  updateCart();
  showToast(p.name+' añadido al carrito');
}
function saveCart(){localStorage.setItem('vulcan_cart',JSON.stringify(cart));}
function removeFromCart(id){cart=cart.filter(x=>x.id!==id);saveCart();updateCart();}
function updateCart(){
  const count=cart.reduce((a,b)=>a+b.qty,0);
  const cc=document.getElementById('cartCount');
  cc.textContent=count;
  cc.classList.toggle('visible',count>0);
  const total=cart.reduce((a,b)=>a+b.num*b.qty,0);
  document.getElementById('cartTotal').textContent=total.toFixed(2).replace('.',',')+' €';
  const ci=document.getElementById('cartItemsWrap');
  const cf=document.getElementById('cartFoot');
  if(!cart.length){
    ci.innerHTML='<div class="cart-empty"><p>Tu carrito está vacío</p></div>';
    cf.style.display='none';
  } else {
    ci.innerHTML=cart.map(item=>`
      <div class="cart-item">
        <img src="${item.img}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-info">
          <p class="ctag">Volcano Science</p>
          <h4>${item.name}${item.qty>1?' &times; '+item.qty:''}</h4>
          <p class="cprice">${(item.num*item.qty).toFixed(2).replace('.',',')} &euro;</p>
        </div>
        <button class="cart-remove" onclick="removeFromCart(${item.id})">&#10005;</button>
      </div>
    `).join('');
    cf.style.display='block';
  }
}
function openCart(){document.getElementById('cartDrawer').classList.add('open');document.getElementById('cartOverlay').classList.add('open');document.body.style.overflow='hidden';}
function closeCart(){document.getElementById('cartDrawer').classList.remove('open');document.getElementById('cartOverlay').classList.remove('open');document.body.style.overflow='';}

// ===== TOAST =====
function showToast(msg){
  const t=document.getElementById('toast');
  t.textContent=msg;t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),2600);
}

// ===== TOGGLE DE SONIDO =====
function toggleSound(){
  const v=document.getElementById('socialVideo');
  const lbl=document.getElementById('soundLabel');
  const w1=document.getElementById('soundWave1');
  const w2=document.getElementById('soundWave2');
  v.muted=!v.muted;
  if(!v.muted){lbl.textContent='Silenciar';w1.style.opacity='1';w2.style.opacity='1';}
  else{lbl.textContent='Activar sonido';w1.style.opacity='.3';w2.style.opacity='.3';}
}

// ===== FORMULARIO =====
async function submitForm(e){
  e.preventDefault();
  const form=document.getElementById('contactForm');
  const btn=document.getElementById('btnSubmit');
  const formOk=document.getElementById('formOk');

  // Estado de carga
  btn.disabled=true;
  btn.textContent='Enviando...';

  const data=new FormData(form);
  const json=Object.fromEntries(data.entries());

  try{
    const res=await fetch('https://api.web3forms.com/submit',{
      method:'POST',
      headers:{'Content-Type':'application/json','Accept':'application/json'},
      body:JSON.stringify(json)
    });
    const result=await res.json();
    if(result.success){
      form.style.display='none';
      formOk.style.display='block';
    } else {
      throw new Error(result.message||'Error desconocido');
    }
  } catch(err){
    btn.disabled=false;
    btn.textContent='Enviar Mensaje';
    alert('Ha ocurrido un error al enviar el mensaje. Por favor, inténtalo de nuevo o escríbenos directamente a hola@vulcanvolcanoscience.com');
    console.error('Form error:',err);
  }
}

// ===== REVEAL =====
const ro=new IntersectionObserver(entries=>{
  entries.forEach(el=>{if(el.isIntersecting){el.target.classList.add('in');ro.unobserve(el.target);}});
},{threshold:.08});
function initReveal(){
  document.querySelectorAll('.reveal,.reveal-l,.reveal-r').forEach(el=>{
    if(!el.classList.contains('in')) ro.observe(el);
  });
}

// ===== ESC =====
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){closeLb();closeModalDirect();}
});

// Fallback para imágenes no disponibles
document.querySelectorAll('img').forEach(img=>{
  img.addEventListener('error',function(){
    this.src='assets/images/wow.webp';
  });
});

// ===== INIT =====
buildProducts();
updateCart();
(function(){
  const hash=location.hash.replace('#','').replace('/','').trim();
  const page=PAGES.includes(hash)?hash:'home';
  renderPage(page);
})();
initReveal();
runParallax();