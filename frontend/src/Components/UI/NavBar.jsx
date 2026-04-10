import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../../context/index'
import { useTranslation } from 'react-i18next'

const NavBar = () => {
  const { t } = useTranslation()

  const { user, setUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const logOut = () => {
    localStorage.clear()
    setUser(null)
    navigate('/login')
  }

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Link className="navbar-brand" to="/">{t('navBar.link')}</Link>
        {user !== null ? <Button variant="primary" onClick={logOut}>{t('navBar.logOut')}</Button> : null}
      </div>
    </nav>
  )
}

export default NavBar
