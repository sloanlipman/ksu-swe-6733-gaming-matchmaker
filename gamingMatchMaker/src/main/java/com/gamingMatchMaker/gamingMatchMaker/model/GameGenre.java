package com.gamingMatchMaker.gamingMatchMaker.model;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name="gameGenre")
public class GameGenre {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", columnDefinition = "int(11)")
    private int id;

    @Column(name= "GenreName")
    private String genreName;

    @ManyToMany
    private Set<UserRec> users;

    public GameGenre() {
    }

    public GameGenre(GameGenre original) {
        this.id  = original.id;
        this.genreName = original.genreName;
    }

    public GameGenre(String genreName, Set<UserRec> users) {
        genreName = genreName;
        this.users = users;
    }
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getGenreName() {
        return genreName;
    }

    public void setGenreName(String genreName) {
        genreName = genreName;
    }

    public Set<UserRec> getUsers() {
        return users;
    }

    public void setUsers(Set<UserRec> users) {
        this.users = users;
    }
}
