import { useEffect, useState } from 'react';
import './App.css'

function Table({ data }) {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const [months, setMonths] = useState(0);
  const [startMonth, setStartMonth] = useState(new Date().getMonth());

  const monthsDifference = () => {
    const today = new Date();
    const target = new Date(data["limit-date"]);

    const yearDiff = target.getFullYear() - today.getFullYear();
    const monthDiff = target.getMonth() - today.getMonth();
    const totalMonths = yearDiff * 12 + monthDiff + 1; // +1 para incluir el mes actual

    setStartMonth(today.getMonth());
    setMonths(totalMonths);
  };

  useEffect(() => {
    monthsDifference();
  }, [data]); // Solo recalcular si los datos cambian

  const monthlySavings = months > 0 ? Math.round(Number(data["cost"]) / months) : 0;
  const costForm = new Intl.NumberFormat('es-MX', {
    style: "currency",
    currency: "MXN"
  }).format(monthlySavings);

  return (
    <div style={{ width: "60vw", margin: "0 auto", display: "flex", justifyContent: "center" }}>
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Expected savings</th>
            <th>Real savings</th>
            <th>Difference</th>
            <th>Accumulated balance</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          {
            Array.from({ length: months }).map((_, i) => {
              const monthIndex = (startMonth + i) % 12;
              const yearOffset = Math.floor((startMonth + i) / 12);
              const currentYear = new Date().getFullYear() + yearOffset;

              return (
                <tr key={i}>
                  <td>{monthNames[monthIndex]} {currentYear}</td>
                  <td>{costForm}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
}

function App() {
  const [isVisible, setVisible] = useState(true);
  const [goal, setGoal] = useState('');
  const [limitDate, setLimitDate] = useState('');
  const [cost, setCost] = useState('');

  const handleReview = () => {
    setVisible(!isVisible);
  }

  return (
    <>
      <div className='box'>
        <h2 className='title'>Savings Plan</h2>
        {isVisible && <div className='box-input'>
          <label htmlFor='goal'>Goal</label>
          <input type="text" name="goal" id="goal" value={goal} onChange={(event) => setGoal(event.target.value)} />
        </div>}
        {isVisible && <div className='box-input'>
          <label htmlFor="limit-date">Limit Date</label>
          <input type="date" name="limit-date" id="limit-date" value={limitDate} onChange={(event) => setLimitDate(event.target.value)} />
        </div>}
        {isVisible && <div className='box-input'>
          <label htmlFor="cost">Price</label>
          <input type="number" name="cost" id="cost" value={cost} onChange={(event) => setCost(event.target.value)} />
        </div>}
        <input type="button" value={isVisible ? "Review" : "Change"} onClick={handleReview} />
      </div>

      {!isVisible &&
        <Table data={
          {
            "goal": goal,
            'limit-date': limitDate,
            'cost': cost
          }
        } />
      }
    </>
  )
}

export default App
