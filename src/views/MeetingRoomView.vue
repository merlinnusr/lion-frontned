<template>
    <h1>Lista de salas de juntas</h1>
    <div class="card">
        <div class="card-body">
            <button class="btn btn-success my-2 mx-2" @click="openModal">Crear nueva sala de juntas</button>
            <router-link class="btn btn-primary my-2 mx-2" to="/book-meeting-room">Reservar sala de juntas</router-link>

            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="meeting_room in meeting_rooms" :key="meeting_room.id">
                        <th scope="row">{{meeting_room.id}}</th>
                        <td>{{meeting_room.name}}</td>
                        <td>
                            <button class="btn btn-danger mx-2"
                                @click="deleteMeetingRoomModal(meeting_room.id)">Eliminar</button>
                            <button class="btn btn-warning"
                                @click="editMeetRoomModal(meeting_room.id)">Editar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <ModalItem :open="modalOpen">
            <div class="modal-content">

                <div class="modal-header">
                    <h5 class="modal-title">Crear nueva sala de juntas</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true" @click="openModal">&times;</span>
                    </button>
                </div>
                <div class="modal-body">

                    <form>
                        <label for="name">Nombre de sala de juntas</label>
                        <input class="form-control" type="text" name="name" id="name" v-model="meeting_room_name" />
                    </form>
                    <li v-for="error in errors" :key="error">
                        Errores:
                        {{error}}
                    </li>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="openModal">Cerrar</button>
                    <button type="button" class="btn btn-primary" @click="createMeetingRoom">Crear</button>
                </div>
            </div>
        </ModalItem>
        <ModalItem :open="modalUpdateMeetingRoom">
            <div class="modal-content">

                <div class="modal-header">
                    <h5 class="modal-title">Editar sala de juntas</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true" @click="modalUpdateMeetingRoom = !modalUpdateMeetingRoom">&times;</span>
                    </button>
                </div>
                <div class="modal-body">

                    <form>
                        <label for="name">Nombre de sala de juntas</label>
                        <input class="form-control" type="text" name="name" id="name" v-model="meeting_room_name" />
                    </form>
                    <li v-for="error in errors" :key="error">
                        Errores:
                        {{error}}
                    </li>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="modalUpdateMeetingRoom = !modalUpdateMeetingRoom">Cerrar</button>
                    <button type="button" class="btn btn-primary" @click="editMeetingRoom">Editar</button>
                </div>
            </div>
        </ModalItem>
        <ModalItem :open="modalDeleteMeetingRoom">
            <div class="modal-content">

                <div class="modal-header">
                    <h5 class="modal-title">Borrar sala de juntas</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true" @click="modalDeleteMeetingRoom = !modalDeleteMeetingRoom">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>Deseas elminar esta sala de juntas</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="modalDeleteMeetingRoom = !modalDeleteMeetingRoom">Cerrar</button>
                    <button type="button" class="btn btn-primary" @click="deleteMeetingRoom">Eliminar</button>
                </div>
            </div>
        </ModalItem>
    </div>
</template>
<script>
import MeetingRoomService from '@/services/MeetingRoomService';
import ModalItem from '../components/ModalItem.vue';

export default {
    name: "MeetingRoomView",
    data() {
        return {
            meeting_rooms: [],
            modalOpen: false,
            meeting_room_name: "",
            errors: [],
            modalDeleteMeetingRoom: false,
            modalUpdateMeetingRoom: false,
            meeting_room_update: 0,
            meeting_room_delete: 0,
        };
    },
    methods: {
        editMeetRoomModal(id){
            this.meeting_room_update = id;
            this.modalUpdateMeetingRoom = true;
        },
        editMeetingRoom() {
            MeetingRoomService.update(this.meeting_room_update, {'name': this.meeting_room_name} ).then((response) => {
                const objIndex = this.meeting_rooms.findIndex((obj => obj.id == this.meeting_room_update));
                this.meeting_rooms[objIndex].name = response.data.data.meeting_room.name;
                this.modalUpdateMeetingRoom = false;
                this.meeting_room_update = 0;
            }).catch(error => {
                if (error.response.status === 422) {
                    let errors = error.response.data.errors;
                    for (const [key, value] of Object.entries(errors)) {
                        this.errors.push(`${key}: ${value}`);
                    }
                }
            })
        },
        deleteMeetingRoom() {
            MeetingRoomService.delete(this.meeting_room_delete).then(() => {
                this.meeting_rooms = this.meeting_rooms.filter((item) => {
                    return item.id != this.meeting_room_delete
                })
                this.modalDeleteMeetingRoom = false;
                this.meeting_room_delete = 0;

            }).catch(error => {
                if (error.response.status === 422) {
                    let errors = error.response.data.errors;
                    for (const [key, value] of Object.entries(errors)) {
                        this.errors.push(`${key}: ${value}`);
                    }
                }
            })
        },
        deleteMeetingRoomModal(id) {
            this.modalDeleteMeetingRoom = true;
            this.meeting_room_delete = id;
        },
        createMeetingRoom() {
            MeetingRoomService.create({
                'name': this.meeting_room_name
            }).then((response) => {
                this.meeting_rooms.push(
                    response.data.data.meeting_room
                );
                this.meeting_room_name = ""
                this.modalOpen = false;
            }).catch(error => {
                if (error.response.status === 422) {
                    let errors = error.response.data.errors;
                    for (const [key, value] of Object.entries(errors)) {
                        this.errors.push(`${key}: ${value}`);
                    }
                }
            });
        },
        openModal() {
            this.modalOpen = !this.modalOpen;
        },
        getAllMeetingRooms() {
            MeetingRoomService.getAll().then((response) => {
                this.meeting_rooms = response.data.data.meeting_rooms;
            });
        },
    },
    mounted() {
        this.getAllMeetingRooms();
    },
    components: { ModalItem }
};
</script>
<style scoped>

</style>