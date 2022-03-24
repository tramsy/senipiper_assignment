const Header = ({activeTab, setActiveTab})=>{
    return(
        <header className='header'>
        <nav className='nav'>
           <ul className='nav__ul'>
             <li className='nav__li'>
                <button className={`nav__btn ${activeTab === 0 && 'active'}`} onClick={()=>setActiveTab(0)}>Form</button>
            </li>
            <li className='nav__li'>
                <button className={`nav__btn ${activeTab === 1 && 'active'}`} onClick={()=>setActiveTab(1)} >Table</button>
            </li>
           </ul>
        </nav>
      </header>
    )
}

export default Header;