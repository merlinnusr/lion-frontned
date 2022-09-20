<template>
    <div class="main">
        <h1>Crear nueva sala de juntas</h1>
                <hr>
        <div class="card">
            <div class="card-body mx-auto">

                <form  @submit="book">
                    <div class="form-group">
                        <label for="meeting_date_start">Horario de comienzo de uso de sala de juntas:</label>
                        <input 
                            class="form-control" 
                            type="datetime-local" 
                            id="meeting_date_start" 
                            name="meeting_date_start" 
                            v-model="meeting_date_start"
                            />
                    </div>
                    <div class="form-group">
                        <label for="meeting_date_end">Horario de finalizacion de uso de sala de juntas:</label>
                        <input 
                            class="form-control" 
                            type="datetime-local" 
                            id="meeting_date_end" 
                            name="meeting_date_end"
                            @change="onChangeEndDate($event)"
                            v-model="meeting_date_end"
                            />
                    </div>
                    <div class="form-group">
                        <label for="meeting_room_id">Salas</label>
                        <select v-model="meeting_room_id" class="form-control" name="meeting_room_id" id="meeting_room_id">
                            <option 
                                v-for="meeting_room in meeting_rooms" 
                                :key="meeting_room.id" 
                                :value="meeting_room.id">
                                {{meeting_room.name}}
                            </option>
                        </select>
                    </div>
                    <li v-if="successMsg" class="alert alert-success">
                        {{successMsg}}
                    </li>
                    <li v-for="error in errors" :key="error">
                        {{error}}
                    </li>
                    <button class="btn btn-primary" >Reservar</button>
                </form>
            </div>
        </div>
    </div>
</template>
  
<script>
import MeetingRoomService from '@/services/MeetingRoomService';
import BookMeetingRoomService from '@/services/BookMeetingRoomService';

import moment from 'moment';


export default {

    name: 'BookMeetingRoomView',
    data() {
        return {
            meeting_rooms: [],
            meeting_date_start: "",
            meeting_date_end: "",
            meeting_room_id: "",
            errors: [],
            successMsg: "",
        };
    },
    components: {

    },
    methods: {
        onChangeEndDate(){
            console.log(this.meeting_date_end);
            if (this.meeting_date_end <= this.meeting_date_start){
                this.errors.push(
                    ' No puede ser mayo a la fecha de inicio'
                );
                this.meeting_date_end = "";
            }
        },
        book(e){
            e.preventDefault()
            if (!this.meeting_date_start) {
                return this.errors.push(
                    'La fecha no de inicio puede ser vacia'
                );
            }
            if (!this.meeting_date_end) {
                return this.errors.push(
                    'La fecha no de finalizacion puede ser vacia'
                );
            }
            if (!this.meeting_room_id) {
                return this.errors.push(
                    'El room id no puede ser vacia'
                );
            }
            BookMeetingRoomService.create({
                'meeting_date_start' : this.meeting_date_start,
                'meeting_date_end': this.meeting_date_end,
                'meeting_room_id': this.meeting_room_id,
            }).then((response) => {
                console.log(response.msg);
                this.successMsg = response.data.msg;
                this.$router.push('/book-meeting-room-list')
            }).catch((error) => {
                this.errors = [];
                if (error.response.status === 422) {
                    let errors = error.response.data.errors;
                    for (const [key, value] of Object.entries(errors)) {
                        this.errors.push(`${key}: ${value}`);
                    }
                }
                if (error.response.status === 500) {
                    let errors = error.response.data.msg;
                    console.log(error.response.data.msg);
                    this.errors.push(
                        errors
                    );
                }
            });
        },
        setDates() {
            const meeting_date_start = moment().endOf("day").format('YYYY-MM-DDThh:mm');
            document.getElementById('meeting_date_start').setAttribute('min', meeting_date_start);
            document.getElementById('meeting_date_end').setAttribute('min', meeting_date_start);

        },
        setMeetingRooms(){
            MeetingRoomService.getAll().then((response) => {
                this.meeting_rooms = response.data.data.meeting_rooms;
            });
        }
    },
    mounted() {
        this.setDates();
        this.setMeetingRooms();
    }
}
</script>
  