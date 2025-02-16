import { useState } from 'react'; 
import './App.css';

interface Invoice {
  accountNumber: string;
  description: string;
  groupName: string;
  days: number;
  email: string;
  amount: number;
  currency: string;
  paymentLink: string;
}

interface InvoiceUpdate {
  accountNumber: string;
  description: string;
  groupName: string;
  days: number;
  email: string;
  amount: number;
  currency: string;
  paymentStatus: string;
  checkLink: string;
}

const App = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [page, setPage] = useState<'home' | 'next' | 'final'>('home');
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [invoiceUpd, setInvoiceUpd] = useState<InvoiceUpdate | null>(null);

  const validateEmail = async (email: string) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(email);
  };

  const handleSubmit = async () => {
    if (!(await validateEmail(email))) {
      setError('Введите корректный email');
      return;
    }
    setError('');
    // Тестовые данные вместо API-запроса
    const testInvoice: Invoice = {
      accountNumber: '123456789',
      description: 'Оплата подписки на сервис',
      groupName: 'Доступ к группе VIP',
      days: 30,
      email: email,
      amount: 1999,
      currency: 'RUB',
      paymentLink: 'https://yandex.ru',
    };
    setInvoice(testInvoice);
    setPage('next');
    // try {
    //   const response = await fetch('https://emailapi.com/api/validate', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     //@ts-ignorets
    //     body: JSON.stringify({ email, initData: window.Telegram?.WebApp?.initData }),
    //   });
      
    //   const data: Invoice = await response.json();
    //   setInvoice(data);
    //   setPage('next');
    // } catch (err) {
    //   setError('Ошибка при отправке данных');
    // }
  };

  
  const handleOpenStatus = async () => {
    window.open(invoice?.paymentLink, '_blank'); // Открывает ссылку во внешнем браузере
    await handleUpdate();
  };


  const handleCheck = async () => {
    window.open(invoiceUpd?.checkLink, '_blank'); // Открывает ссылку во внешнем браузере
  };
  
  const handleUpdate = async () => {
    // Тестовые данные вместо API-запроса
    const testInvoiceUpd: InvoiceUpdate = {
      accountNumber: '123456789',
      description: 'Оплата подписки на сервис',
      groupName: 'Доступ к группе VIP',
      days: 30,
      email: email,
      amount: 1999,
      currency: 'RUB',
      paymentStatus: 'ОПЛАЧЕНО',
      checkLink: 'https://google.com'
    };
    setInvoiceUpd(testInvoiceUpd);
    setPage('final');
    // try {
    //   const response = await fetch('https://emailapi.com/api/updateStatus', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     //@ts-ignorets
    //     body: JSON.stringify({ email, initData: window.Telegram?.WebApp?.initData }),
    //   });
      
    //   const data: InvoiceUpdate = await response.json();
    //   setInvoiceUpd(data);
    //   setPage('final');
    // } catch (err) {
    //   setError('Ошибка при отправке данных');
    // }
  };
  

  return (
    <div className="container">
      <div className="header">
        <img src="/logo.png" alt="Логотип банка" className="logo" />
        <h1 className="bank-name">Название Банка</h1>
      </div>
      {page === 'home' && (
        <>
          <div className="bank-description">
            <h2>О нашем банке</h2>
            <p>
              Мы работаем для вас, предлагая лучшие условия для хранения и приумножения ваших средств.
            </p>
          </div>
          <div className='error-message'> {error && <p className="error-message">{error}</p>}</div>
          <div className="email-form">
            <input
              type="email"
              className="input"
              placeholder="Введите ваш email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='button-container'> 
            <button className="button" onClick={handleSubmit}>
              Далее
            </button>
          </div>
        </>
      )}
      {page === 'next' && invoice && (
        <div className="next-page">
          <div className="next-page-container">
          <h1>{`Счет № ${invoice.accountNumber}`}</h1>
          <p><strong>Описание счета:</strong> {invoice.description}</p>
          <p><strong>Название:</strong> {invoice.groupName}</p>
          <p><strong>Количество дней продления:</strong> {invoice.days}</p>
          <p><strong>Email:</strong> {invoice.email}</p>
          <p><strong>Сумма платежа:</strong> {invoice.amount} {invoice.currency}</p>
          </div>
          <div className='button-container'> 
            <button className="button" onClick={handleOpenStatus}>
              Оплатить доступ
            </button>
            <button className="button" onClick={() => setPage('home')}>
              Назад
            </button>
          </div>
        </div>
      )}
      {page === 'final' && invoiceUpd && (
        <div className="next-page">
          <div className="next-page-container">
          <h1>{`Счет № ${invoiceUpd.accountNumber}`}</h1>
          <p><strong>Описание счета:</strong> {invoiceUpd.description}</p>
          <p><strong>Название:</strong> {invoiceUpd.groupName}</p>
          <p><strong>Количество дней продления:</strong> {invoiceUpd.days}</p>
          <p><strong>Email:</strong> {invoiceUpd.email}</p>
          <p><strong>Сумма платежа:</strong> {invoiceUpd.amount} {invoiceUpd.currency}</p>
          <p><strong>Статус:</strong> {invoiceUpd.paymentStatus}</p>
          </div>
          <div className='button-container'>
          {invoiceUpd.paymentStatus === 'ОПЛАЧЕНО' ? (
              <button className="button" onClick={handleCheck}>
                Чек
              </button>
            ) : (
              <button className="button" onClick={handleUpdate}>
                Обновить
              </button>
            )} 
            <button className="button" onClick={() => setPage('home')}>
              Назад
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
