export interface HistoryQuotationCard {
  id: number;
  taskNumber: string;
  receptionDate: string;
  uploadDate: string;
  expirationDateTime: string;
  materialsNeededDate: string;
  customerRequestNumber: string;
  lastModifiedDate: string;
  step: number;
  buyer: string;
  client: string;
  users: string[];
}
