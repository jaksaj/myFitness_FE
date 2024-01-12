function ExerciseItem(params) {
    return(
        <div>
            <div className={styles.programItem}>
                <h3>Exercise: {program.name}</h3>
                <p>Sets: {program.sets}</p>
                <p>Reps: {program.reps}</p>
                <p>Weight: {program.weight}</p>
            </div>
        </div>
    )
}

export default ExerciseItem;