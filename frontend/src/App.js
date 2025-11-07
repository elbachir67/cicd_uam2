import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState({ income: 0, expenses: 0, balance: 0 });
  const [form, setForm] = useState({
    description: '',
    amount: '',
    type: 'expense'
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTransactions();
    fetchBalance();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`${API_URL}/transactions`);
      setTransactions(response.data);
    } catch (error) {
      console.error('Erreur fetch transactions:', error);
    }
  };

  const fetchBalance = async () => {
    try {
      const response = await axios.get(`${API_URL}/balance`);
      setBalance(response.data);
    } catch (error) {
      console.error('Erreur fetch balance:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${API_URL}/transactions`, {
        description: form.description,
        amount: parseFloat(form.amount),
        type: form.type
      });

      setForm({ description: '', amount: '', type: 'expense' });
      fetchTransactions();
      fetchBalance();
    } catch (error) {
      console.error('Erreur ajout transaction:', error);
      alert('Erreur lors de l\'ajout de la transaction');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/transactions/${id}`);
      fetchTransactions();
      fetchBalance();
    } catch (error) {
      console.error('Erreur suppression:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF'
    }).format(amount);
  };

  return (
    <div className="app">
      <div className="container">
        <header>
          <h1>💰 Budget Tracker</h1>
          <p>Gérez vos finances simplement</p>
        </header>

        {/* Balance Cards */}
        <div className="balance-cards">
          <div className="card income">
            <span className="label">Revenus</span>
            <span className="amount">{formatAmount(balance.income)}</span>
          </div>
          <div className="card expenses">
            <span className="label">Dépenses</span>
            <span className="amount">{formatAmount(balance.expenses)}</span>
          </div>
          <div className="card balance">
            <span className="label">Solde</span>
            <span className="amount">{formatAmount(balance.balance)}</span>
          </div>
        </div>

        {/* Form */}
        <div className="form-container">
          <h2>Nouvelle transaction</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Montant (FCFA)"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              required
              min="0"
              step="0.01"
            />
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  value="income"
                  checked={form.type === 'income'}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                />
                Revenu
              </label>
              <label>
                <input
                  type="radio"
                  value="expense"
                  checked={form.type === 'expense'}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                />
                Dépense
              </label>
            </div>
            <button type="submit" disabled={loading}>
              {loading ? 'Ajout...' : 'Ajouter'}
            </button>
          </form>
        </div>

        {/* Transactions List */}
        <div className="transactions-container">
          <h2>Historique</h2>
          {transactions.length === 0 ? (
            <p className="empty">Aucune transaction</p>
          ) : (
            <div className="transactions-list">
              {transactions.map((transaction) => (
                <div
                  key={transaction._id}
                  className={`transaction-item ${transaction.type}`}
                >
                  <div className="transaction-info">
                    <span className="description">{transaction.description}</span>
                    <span className="date">{formatDate(transaction.date)}</span>
                  </div>
                  <div className="transaction-actions">
                    <span className="amount">
                      {transaction.type === 'income' ? '+' : '-'}
                      {formatAmount(transaction.amount)}
                    </span>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(transaction._id)}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
