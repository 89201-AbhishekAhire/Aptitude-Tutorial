package com.sunbeam.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "question_options")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuestionOption {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "option_id")
    private Long optionId;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id", nullable = false)
    private Question question;
    
    @Column(name = "option_label", nullable = false, length = 10)
    private String optionLabel;
    
    @Column(name = "option_text", nullable = false, columnDefinition = "TEXT")
    private String optionText;
    
    @Column(name = "is_correct")
    private Boolean isCorrect = false;
} 