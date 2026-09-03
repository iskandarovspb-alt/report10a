const FORM_ID = "1FAIpQLScdIG-zovGd3BGOv-lXNkofipEhjCzCBx0AxWkyJYu8hNRkeQ";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const form = FormApp.openById(FORM_ID);
    const response = form.createResponse();

    const items = form.getItems();
    const map = {
      "Дата": data.date,
      "Наличные сумма": String(data.cash ?? 0),
      "Безналичный расчет сумма": String(data.card ?? 0),
      "Доставка": String(data.delivery ?? 0),
      "Аванс/ЗП": String(data.salary ?? 0),
      "Сырье (чеки)": String(data.raw ?? 0),
      "Развоз персонала": String(data.transport ?? 0),
      "Заполнил Менеджер": data.manager
    };

    items.forEach(item => {
      const title = item.getTitle();
      if (!(title in map)) return;
      const value = map[title];
      const type = item.getType();

      if (type === FormApp.ItemType.TEXT) {
        response.withItemResponse(item.asTextItem().createResponse(value));
      } else if (type === FormApp.ItemType.PARAGRAPH_TEXT) {
        response.withItemResponse(item.asParagraphTextItem().createResponse(value));
      } else if (type === FormApp.ItemType.MULTIPLE_CHOICE) {
        response.withItemResponse(item.asMultipleChoiceItem().createResponse(value));
      } else if (type === FormApp.ItemType.LIST) {
        response.withItemResponse(item.asListItem().createResponse(value));
      } else if (type === FormApp.ItemType.DATE) {
        response.withItemResponse(item.asDateItem().createResponse(new Date(value)));
      }
    });

    response.submit();
    return ContentService.createTextOutput(JSON.stringify({ok:true})).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ok:false,error:String(err)})).setMimeType(ContentService.MimeType.JSON);
  }
}