import { useTranslation } from 'react-i18next';
import img from '../assets/NotFound404.svg'
import NavBar from '../Components/UI/NavBar';
import { Link } from 'react-router-dom';

const NotFound = () => {

  const { t } = useTranslation()

  return (
    <>
      <div className="d-flex flex-column h-100">
        <NavBar/>
        <div className="text-center">
          <img alt="Страница не найдена" className="img-fluid h-25" src={img} />
          <h1 className="h4 text-muted">{t('pageNotFound.notFound')}</h1>
          <p className="text-muted">
            {t('pageNotFound.transition')} <Link to='/'>{t('pageNotFound.linkMainPage')}</Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default NotFound;