// import React from 'react'

function Header() {
  return (
    <>
       <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="#">ESF Blog</a>
            <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            {/* <input className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search"> */}
            <div className="navbar-nav">
            <div className="nav-item text-nowrap">
                <form action="/logout" method="post">
                <button type="submit" className="av-link px-3 bg-dark border-0 text-white">
                    Logout <span data-feather="log-out" className="align-text-bottom"></span>
                </button>
                </form>
            </div>
            </div>
        </header>
    </>
  )
}

export default Header