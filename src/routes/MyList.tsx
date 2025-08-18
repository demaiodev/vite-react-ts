import Container from "../components/Container";
// import Grid from "../components/Grid";

export default function MyList() {
  return (
    <Container classNames="m-4">
      <div>List of my movies</div>
      {/* <Grid>
        {movies.map((movie) => (
          <MovieTile key={movie.id} movie={movie} />
        ))}
      </Grid> */}
    </Container>
  );
}
