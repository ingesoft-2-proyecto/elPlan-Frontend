import { API_SEARCH_EVENTS_PRICE } from '../config/const'

export function searchEventsPrice(events){
  return events && events.map(event => {
    return{
      id: event.id || '',
      name: event.name || '',
      description: event.description || '',
      address: event.address || '',
      borough: event.borough || '',
      date_of_event: event.date_of_event || '',
      cost: event.cost || '',
      type_of_public: event.type_of_public || '',
      category: event.category || '',
      photo: event.photo || 'https://canaltrece.com.co/uploads/ck-uploads/2019/06/20/ROCK-AL-PARQUE-2019-BANDAS-PROGRAMACION-HORARIOS-FECHAS-2_UWfnKJb.JPG',
    }
  })
}
