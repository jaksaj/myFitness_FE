function ExerciseItem(program) {
    return(
        <div>
            <div>
                <h3>Exercise: {program.program.name}</h3>
                <p>Sets: {program.program.sets}</p>
                <p>Reps: {program.program.reps}</p>
            </div>
        </div>
    )
}

export default ExerciseItem;