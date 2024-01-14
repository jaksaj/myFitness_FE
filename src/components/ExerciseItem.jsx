import api from "../axiosConfig";
function ExerciseItem({exercise, workoutId, onDelete}) {
    const handleDelete = async () => {
        try {
          const response = await api.delete(`/exercises/${workoutId}/${exercise._id}`);
          if (response.status === 200) {
            onDelete(exercise._id);
          } else {
            console.error("Error deleting training program:", response);
          }
        } catch (error) {
          console.error("Error deleting training program:", error);
        }
      };
    return(
        <div>
            <div>
                <h3>Exercise: {exercise.name}</h3>
                <p>Sets: {exercise.sets}</p>
                <p>Reps: {exercise.reps}</p>
            </div>
            <button onClick={handleDelete}>
          Delete
      </button>
        </div>
    )
}

export default ExerciseItem;