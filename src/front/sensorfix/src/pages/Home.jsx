import React from 'react';

export default function Home() {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ textAlign: 'center' }}>Bem-vindo à Home</h1>
            <p style={{ textAlign: 'center' }}>
                Este é um teste de responsividade. Redimensione a janela para verificar o comportamento.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
                <div style={{
                    flex: '1 1 300px',
                    minWidth: '200px',
                    maxWidth: '400px',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    textAlign: 'center'
                }}>
                    <p>Caixa 1</p>
                </div>
                <div style={{
                    flex: '1 1 300px',
                    minWidth: '200px',
                    maxWidth: '400px',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    textAlign: 'center'
                }}>
                    <p>Caixa 2</p>
                </div>
                <div style={{
                    flex: '1 1 300px',
                    minWidth: '200px',
                    maxWidth: '400px',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    textAlign: 'center'
                }}>
                    <p>Caixa 3</p>
                </div>
            </div>
        </div>
    );
}