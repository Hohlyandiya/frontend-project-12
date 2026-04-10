import img from '../assets/avatar.jpg'
import FormAuthorization from '../Components/FormAuthorization'
import { useNavigate, Link } from 'react-router-dom'
import NavBar from '../Components/UI/NavBar'
import { useTranslation } from 'react-i18next'

const RegistrationForm = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  return (
    <>
      <div className="d-flex flex-column h-100">
        <NavBar />
        <div className="container-fluid h-100">
          <div className="row justify-content-center align-content-center h-100">
            <div className="col-12 col-md-8 col-xxl-6">
              <div className="card shadow-sm">
                <div className="card-body row p-5">
                  <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                    <img src={img} className="rounded-circle" alt="Войти" />
                  </div>
                  <FormAuthorization navigate={navigate} />
                </div>
                <div className="card-footer p-4">
                  <div className="text-center">
                    <span>
                      {t('pageLogin.noAccount')} 
                    </span>
                    <Link to="/signup">{t('pageLogin.linkSingup')}</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RegistrationForm
