export function Mountains({ industrial = false }: { industrial?: boolean }) {
  return <svg className="mountain-scene" viewBox="0 0 1200 300" fill="none" aria-hidden="true">
    <path className="mountain-far" d="M0 230 85 197 141 212 265 99 312 142 366 127 435 191 581 48 628 101 665 76 804 208 884 136 989 214 1101 124 1200 201V300H0Z" />
    <path className="mountain-mid" d="M0 264 173 193 223 230 384 163 468 240 618 169 742 241 881 202 1012 251 1110 199 1200 237V300H0Z" />
    <path className="mountain-front" d="M0 283Q124 256 228 282T453 271T746 280T995 268T1200 278V300H0Z" />
    {industrial ? <g className="ink-solid"><path d="M750 269V226H791V209H819V227H878V269ZM812 207V153H825V207ZM883 269V243H924V228H968V270ZM930 224V173H941V224Z"/><path d="M825 151q-15-21 7-31t-10-28q58 16 31 38t-28 21" className="mountain-far"/></g> : <g className="ink-solid"><path d="m916 245 33-12 33 12-8 4h-50Zm8 6h50v20h-50Zm-12 21 37-9 38 9-8 5h-59Z"/><path d="M947 229v-19h4v19"/></g>}
  </svg>;
}

export function ForecastArt() {
  return <div className="technical-art forecast-art">
    <div className="art-caption"><span>FIG. 01 / THE FORECASTING PIPELINE</span><span>OBSERVE → ANTICIPATE</span></div>
    <svg viewBox="0 0 600 300" role="img" aria-label="Illustrative time-series diagram, not measured project results">
      <g className="chart-grid"><path d="M40 60H565M40 115H565M40 170H565M40 225H565M40 35V250M145 35V250M250 35V250M355 35V250M460 35V250M565 35V250"/></g>
      <path className="chart-observed" d="M40 224 65 216 88 221 112 155 137 205 159 188 183 205 208 129 232 179 256 162 280 190 304 105 328 144 350 130 376 153 400 74"/>
      <path className="chart-predicted" d="M400 74Q427 123 447 97T489 81T530 61T565 45"/>
      <path className="forecast-bound" d="M400 74 447 59 489 45 530 27 565 17V98L530 105 489 126 447 143Z"/>
      <path className="chart-axis" d="M40 35V250H565M400 35V250"/>
      <text x="43" y="279">HISTORICAL DEMAND</text><text x="428" y="279">FORECAST</text>
    </svg>
    <div className="art-foot"><span className="ink-stamp">DEMAND → DECISION</span><span>Conceptual architecture / not evaluation data</span></div>
  </div>;
}

export function VisionArt() {
  return <div className="technical-art vision-art">
    <div className="art-caption"><span>FIG. 02 / THE PERCEPTION PIPELINE</span><span>SEE → UNDERSTAND</span></div>
    <svg viewBox="0 0 600 300" role="img" aria-label="Original vehicle line drawing illustrating the image inspection workflow">
      <path className="car-line" d="m79 203 14-58 62-22 66-66h158l81 68 56 21 16 60H79Zm76-80h305M221 57l-25 66m183-66 40 66M303 62v59M111 152l65 6M439 157l48-2M249 148h36M327 148h36"/>
      <circle className="car-wheel" cx="167" cy="205" r="30"/><circle className="car-wheel" cx="418" cy="205" r="30"/>
      <path className="inspection-box" d="M98 141v-13h14m70 0h14v13m0 40v14h-14m-70 0H98v-14M400 150v-14h14m58 0h14v14m0 46v14h-14m-58 0h-14v-14"/>
      <path className="inspection-mark" d="m112 161 18-7 15 12 25-7m259 9 20 9 15-6"/>
      <text x="98" y="112">IMAGE INSPECTION</text><text x="351" y="263">DETECT / ASSESS / REPORT</text>
    </svg>
    <div className="art-foot"><span className="ink-stamp">YOLOv8</span><span>Illustrated workflow / not a detection screenshot</span></div>
  </div>;
}