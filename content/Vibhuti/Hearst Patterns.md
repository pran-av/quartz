---
date: 2025-02-12
tags:
  - MachineLearning
---
Hearst Patterns are relationships between vocabulary and grammar (lexico-syntactic), these algorithms are used to develop ontological learning. Ontological learning refers to the use of existing data and their relationships to develop new ontologies to further refine what's known.

I think Hearst Patterns are similar to how a human kid would learn - they will listen certain words (vocabulary), make certain actions trial and error to figure out the meaning of those words (grammar). As the kid grows, they build relationships between words and their meaning to make their knowledge network dense. This growth does involve input of some new material (like reading books, watching television), but does not totally rely on the amount of data input. When the kid goes into a school and starts learning subjects like science and mathematics - they further build their own ontologies (through the act of thinking) to help them solve problems - hence a adult human becomes a self learning machine.

In terms of Hearst Patterns in context of machine learning, the relationships between concepts are known as hypernym (generic) and hyponym (specific). Example: Mammals are a hypernym and whale would be its hyponym.

The relationships can be multiple in same set of concepts,
- X and other Y
- X or other Y
- Y such as X
- Such Y as X
- Y including X
- Y, especially X
- X which is a Y

Reversed-hypernym (rhyper) is a relationship from specific to generic term. An algorithm built over Hearst Patterns identifies the hyponyms, it sometimes misses such relationships and hence has low-recall. Complex and ambiguous sentences are also a limitation for lexico-syntactic learning methods. However, this method is known to perform better than other distribution methods used to relate datasets.

### Applications
1. [[Named Entity Recognition (NER)]]