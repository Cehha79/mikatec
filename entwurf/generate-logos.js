// Erzeugt alle 12 Logo-Kombis (Nr. 61 + Kreis) als eigenständige SVG-Dateien.
const fs = require('fs');
const path = require('path');

const GOLD='#e3c178', GOLD2='#f6e4b0';
const T1='rgba(22,104,107,.9)', T2='rgba(32,150,143,.6)', TD='rgba(12,47,56,.92)', TFILL='rgba(15,74,82,.6)';
const TCENTER='#2aa39c';

const pt=(cx,cy,r,a)=>[cx+r*Math.cos(a), cy+r*Math.sin(a)];
function poly(cx,cy,n,r,rot=0){
  let d=''; for(let i=0;i<n;i++){ const a=rot-Math.PI/2+i*2*Math.PI/n; const[x,y]=pt(cx,cy,r,a); d+=(i?'L':'M')+x.toFixed(2)+','+y.toFixed(2);} return d+'Z';
}
const P=(d,fill='none',stroke,sw=1)=> `<path d="${d}" fill="${fill}"${stroke?` stroke="${stroke}" stroke-width="${sw}" stroke-linejoin="round"`:''}/>`;
const C=(cx,cy,r,fill='none',stroke,sw=1)=> `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"${stroke?` stroke="${stroke}" stroke-width="${sw}"`:''}/>`;
function dots(n,r,rr=1.5,col=GOLD){ let o=''; for(let i=0;i<n;i++){ const a=-Math.PI/2+i*2*Math.PI/n; const[x,y]=pt(50,50,r,a); o+=C(x.toFixed(2),y.toFixed(2),rr,col);} return o; }

// Doppelquadrat (Stern) von Nr. 61
function squares(scale=1){
  return P(poly(50,50,4,38*scale,0), T1, GOLD,1.3)
       + P(poly(50,50,4,38*scale,Math.PI/4), T2, GOLD,1.3)
       + P(poly(50,50,4,16*scale,0), '#070707', GOLD2,1)
       + P(poly(50,50,4,6*scale,Math.PI/4), TCENTER, GOLD2,.8);
}

const VARS = {
  A: C(50,50,46,'none',GOLD,1.4)+C(50,50,42,'none',GOLD2,.6)+squares(1),
  B: C(50,50,45,TFILL,GOLD,1.2)+squares(.92),
  C: squares(1)+C(50,50,23,'none',GOLD,1.4)+C(50,50,20,'none',GOLD2,.7),
  D: C(50,50,45,TFILL,GOLD,1.2)+squares(.9)+C(50,50,22,'none',GOLD2,.9),
  E: C(50,50,47,'none',GOLD2,.6)+squares(.92)+dots(16,45),
  F: C(50,50,46,'none',GOLD,1.6)+C(50,50,42,'none',GOLD,1)+C(50,50,40,'none',GOLD2,.5)+squares(.82),
  G: C(50,50,34,TFILL,GOLD,1.2)+squares(1)+C(50,50,46,'none',GOLD,1.2),
  H: C(50,50,45,TFILL,GOLD,1.2)+P('M50,7 V93 M7,50 H93','none','rgba(246,228,176,.5)',.8)+squares(.78),
  I: P(poly(50,50,4,44,Math.PI/4),'none',GOLD,1.3)+C(50,50,38,TFILL,GOLD,1.1)
     +P(poly(50,50,4,26,Math.PI/4),T1,GOLD,1.1)+P(poly(50,50,4,26,0),T2,GOLD,1.1)
     +P(poly(50,50,4,9,Math.PI/4),TD,GOLD2,1),
  J: dots(24,47,1.2)+C(50,50,40,TFILL,GOLD,1.1)+squares(.82),
  K: C(50,50,46,'none',GOLD,1.4)+squares(.92)+C(50,50,24,'none',GOLD,1.2)+C(50,50,21,'none',GOLD2,.6),
  L: P(poly(50,50,8,46,0),'none',GOLD,1.2)+C(50,50,40,TFILL,GOLD,1)+squares(.8),

  // aufgeräumte Varianten von L (weniger „dazwischen")
  L1: P(poly(50,50,8,46,0),'none',GOLD,1.2)+squares(.86),                                  // Achteck + Stern, ohne Scheibe
  L2: P(poly(50,50,8,46,0),'none',GOLD,1.2)+C(50,50,38,'none',GOLD2,.7)+squares(.82),       // Achteck + dünner Ring + Stern
  L3: C(50,50,45,'none',GOLD,1.3)+squares(.9),                                              // nur Ring + Stern (kein Achteck)
  L4: P(poly(50,50,8,46,0),'none',GOLD,1.2)+squares(.78)                                    // Achteck + kleinerer Stern, viel Luft
};

const DESC = {
  A:'Goldring außen', B:'Türkis-Kreis gefüllt', C:'Ring mittig', D:'Kreis + Ring',
  E:'Punktring', F:'Doppel-Goldring', G:'Spitzen heraus', H:'Kreis geviertelt',
  I:'Quadrat–Kreis–Quadrat', J:'Gezackter Rand', K:'Außen- + Innenring', L:'Stern in Kreis in Achteck'
};

const outDir = path.join(__dirname, 'logos');
fs.mkdirSync(outDir, {recursive:true});

const wrap = (inner)=> `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">\n${inner}\n</svg>\n`;

Object.entries(VARS).forEach(([k,inner])=>{
  fs.writeFileSync(path.join(outDir, `mikatec-${k}.svg`), wrap(inner));
});

console.log('Erzeugt:', Object.keys(VARS).map(k=>`mikatec-${k}.svg`).join(', '));
