<template>
    <div class="main">
        <h1>Crear nueva sala de juntas</h1>
                <hr>
        <div class="card">
            <div class="card-body mx-auto">

                <form>
                    <div class="form-group">
                        <label for="meeting_date_start">Horario de comienzo de uso de sala de juntas:</label>
                        <input type="datetime-local" id="meeting_date_start" name="meeting_date_start" />
                    </div>
                    <div class="form-group">
                        <label for="meeting_date_end">Horario de finalizacion de uso de sala de juntas:</label>
                        <input type="datetime-local" id="meeting_date_end" name="meeting_date_end" />
                    </div>
                    <div class="form-group">
                        <label for="meeting_room_id">Salas</label>
                        <select name="meeting_room_id" id="meeting_room_id"></select>
                    </div>

                </form>
            </div>
        </div>
    </div>
</template>
  
<script>
import moment from 'moment';


export default {

    name: 'BookMeetingRoomView',
    components: {

    },
    methods: {
        setDates() {
            const meeting_date_start = moment().format('YYYY-MM-DD HH:m:s');
            document.getElementById('meeting_date_start').setAttribute('min', meeting_date_start);
            document.getElementById('meeting_date_end').setAttribute('min', meeting_date_start);

        },
        setMeetingRooms(){
            
        }
    },
    mounted() {
        this.setDates();
    }
}
</script>
  