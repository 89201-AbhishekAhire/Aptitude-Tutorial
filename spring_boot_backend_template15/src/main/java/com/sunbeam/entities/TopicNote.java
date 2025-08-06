package com.sunbeam.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "topic_notes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TopicNote {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "note_id")
    private Long noteId;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "topic_id", nullable = false)
    private Topic topic;
    
    @Column(name = "note_content", nullable = false, columnDefinition = "TEXT")
    private String noteContent;
    
    @Column(name = "display_order")
    private Integer displayOrder = 0;
} 