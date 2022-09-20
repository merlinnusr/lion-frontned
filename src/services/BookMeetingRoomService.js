import http from "../http-common";

class BookMeetingRoomService {
  create(data) {
    return http.post("/meeting_room/book", data);
  }
  getAll(){
    return http.get("/meeting_room/book");
  }
  delete(id){
    return http.delete(`/meeting_room/book/${id}`);
  }
}

export default new BookMeetingRoomService();