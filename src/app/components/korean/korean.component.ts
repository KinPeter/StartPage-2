import { Component, OnInit } from '@angular/core';
import { DictionaryService } from 'src/app/services/dictionary.service';

@Component({
  selector: 'app-korean',
  templateUrl: './korean.component.html',
  styleUrls: ['./korean.component.scss'],
})
export class KoreanComponent implements OnInit {
  cardFront: string;
  cardBack: string;

  constructor(public dict: DictionaryService) {}

  ngOnInit() {
    this.dict.randomWord.subscribe(result => {
      this.cardFront = result.word;
      this.cardBack = result.translate;
    });
  }
}
