### Example for using neo4j

```
  const res = await read(`
  MATCH (g:Genre)
  WHERE g.name <> '(no genres listed)'

        CALL {
        WITH g
        MATCH (g)<-[:IN_GENRE]-(m:Movie)
        WHERE m.imdbRating IS NOT NULL AND m.poster IS NOT NULL
        RETURN m.poster AS poster
        ORDER BY m.imdbRating DESC LIMIT 1
        }

        RETURN g {
          .*,
          movies: toString(size((g)<-[:IN_GENRE]-(:Movie))),
          poster: poster
        } AS genre
        ORDER BY g.name ASC

  `)
  const genres = res.map(row => row.genre)
```
