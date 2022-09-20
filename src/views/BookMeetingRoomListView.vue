<template>
    <div class="main">
        <h1>Lista de reservacion de salas</h1>
        <hr>
        <div class="card">
            <div class="card-body">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Hora de inicio</th>
                            <th scope="col">Hora de finalizacion</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="meeting_room in meeting_rooms" :key="meeting_room.id">
                            <th scope="row">{{meeting_room.id}}</th>
                            <td>{{meeting_room?.meeting_rooms?.name}}</td>
                            <td>{{meeting_room.meeting_date_start}}</td>
                            <td>{{meeting_room.meeting_date_end}}</td>

                            <td>
                                <button class="btn btn-danger mx-2"
                                    @click="deleteModal(meeting_room.id)">Eliminar</button>
                                <button class="btn btn-warning" @click="editModal(meeting_room.id)">Editar</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <ModalItem :open="show_delete_meeting_room_modal">
            <div class="modal-content">

                <div class="modal-header">
                    <h5 class="modal-title">Borrar una reservacion de sala de juntas</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true"
                            @click="show_delete_meeting_room_modal = !show_delete_meeting_room_modal">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>Deseas elminar esta reservacion de sala de juntas</p>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary"
                        @click="show_delete_meeting_room_modal = !show_delete_meeting_room_modal">Cerrar</button>
                    <button type="button" class="btn btn-primary" @click="deleteBookedMeetingRoom">Borrar</button>
                </div>
            </div>
        </ModalItem>
        <ModalItem :open="show_edit_meeting_room_modal">
            <div class="modal-content">

                <div class="modal-header">
                    <h5 class="modal-title">Borrar una reservacion de sala de juntas</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true"
                            @click="show_edit_meeting_room_modal = !show_edit_meeting_room_modal">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form @submit="book">
                        <div class="form-group">
                            <label for="meeting_date_start">Horario de comienzo de uso de sala de juntas:</label>
                            <input class="form-control" type="datetime-local" id="meeting_date_start"
                                name="meeting_date_start" v-model="meeting_date_start" />
                        </div>
                        <div class="form-group">
                            <label for="meeting_date_end">Horario de finalizacion de uso de sala de juntas:</label>
                            <input class="form-control" type="datetime-local" id="meeting_date_end"
                                name="meeting_date_end" @change="onChangeEndDate($event)" v-model="meeting_date_end" />
                        </div>
                        <div class="form-group">
                            <label for="meeting_room_id">Salas</label>
                            <select v-model="meeting_room_id" class="form-control" name="meeting_room_id"
                                id="meeting_room_id">
                                <option v-for="meeting_room in meeting_rooms" :key="meeting_room.id"
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
                        <button class="btn btn-primary">Reservar</button>
                    </form>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary"
                        @click="show_edit_meeting_room_modal = !show_edit_meeting_room_modal">Cerrar</button>
                    <button type="button" class="btn btn-primary" @click="deleteBookedMeetingRoom">Editar</button>
                </div>
            </div>
        </ModalItem>
    </div>
</template>
  
<script>
import BookMeetingRoomService from '@/services/BookMeetingRoomService';
import ModalItem from '../components/ModalItem.vue';

export default {

    name: 'BookMeetingRoomListView',
    data() {
        return {
            meeting_rooms: [],
            delete_meeting_room_id: 0,
            show_delete_meeting_room_modal: false,
            edit_meeting_room_id: 0,
            show_edit_meeting_room_modal: false,
            meeting_date_start: '',
            meeting_date_end: '',
            error: [],
            successMsg: ''
        };
    },
    components: {
        ModalItem
    },
    methods: {
        deleteBookedMeetingRoom() {
            BookMeetingRoomService.delete(this.delete_meeting_room_id).then((response) => {
                if (response.data.data === true) {
                    this.meeting_rooms = this.meeting_rooms.filter((item) => {
                        return item.id != this.delete_meeting_room_id;
                    })
                    this.delete_meeting_room_id = 0;
                    this.show_delete_meeting_room_modal = false;

                }
            })
        },
        deleteModal(id) {
            this.delete_meeting_room_id = id;
            this.show_delete_meeting_room_modal = true
        },
        getBookedMeetingRooms() {
            BookMeetingRoomService.getAll().then((response) => {

                this.meeting_rooms = response.data.data;

            });
        },

    },
    mounted() {
        this.getBookedMeetingRooms();
    }
}
</script>
  