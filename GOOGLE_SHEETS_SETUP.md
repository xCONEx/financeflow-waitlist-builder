
# Configuração do Google Sheets para Waitlist

Para conectar o formulário de waitlist com sua planilha do Google Sheets, siga estes passos:

## 1. Abra sua planilha do Google Sheets
- Acesse: https://docs.google.com/spreadsheets/d/1OAa0-hV7S3SOFqQUG0i79bH1cJdDVxabonYNdZ3Efzs/edit

## 2. Prepare os cabeçalhos
Na primeira linha da planilha, adicione os seguintes cabeçalhos:
- A1: Nome
- B1: Email
- C1: Telefone
- D1: Data/Hora

## 3. Criar Google Apps Script
1. Na planilha, clique em "Extensões" > "Apps Script"
2. Cole o seguinte código:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      data.name,
      data.email,
      data.phone,
      new Date(data.timestamp)
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({status: 'success'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({status: 'error', message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

## 4. Configurar o deployment
1. Clique em "Implantar" > "Nova implantação"
2. Selecione "Aplicativo da web"
3. Defina:
   - Executar como: Eu
   - Quem tem acesso: Qualquer pessoa
4. Clique em "Implantar"
5. Copie a URL da implantação

## 5. Atualizar o código React
No arquivo `src/components/WaitlistForm.tsx`, substitua a URL na linha 42:
```typescript
'https://script.google.com/macros/s/SUA_URL_AQUI/exec'
```

## 6. Testar
Teste o formulário preenchendo os campos e verificando se os dados aparecem na planilha.

## Estrutura da Planilha
| Nome | Email | Telefone | Data/Hora |
|------|-------|----------|-----------|
| João Silva | joao@email.com | (11) 99999-9999 | 2024-01-01 10:30:00 |
