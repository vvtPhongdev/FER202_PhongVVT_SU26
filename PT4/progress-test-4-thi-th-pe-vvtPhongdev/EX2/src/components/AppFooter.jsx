import about from '../data/about'

// TODO-04: Import about from '../data/about' and display logo, appName, copyright
// Requirements:
// - import about from '../data/about'
// - Wrap content in <footer> (already provided below)
// - Show <img src={about.logo} alt="logo" height={28} /> — the logo image
// - Show about.appName as bold text next to the logo
// - Show about.copyright in a div below
function AppFooter() {
  return (
    <footer className="border-top mt-4 py-3 text-center text-muted">
      <div className="d-flex align-items-center justify-content-center gap-2 mb-2">
        <img src={about.logo} alt="logo" height={28} />
        <span className="fw-bold">{about.appName}</span>
      </div>
      <div>{about.copyright}</div>
    </footer>
  )
}

export default AppFooter
