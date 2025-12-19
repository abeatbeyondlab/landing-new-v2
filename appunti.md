TODO -> creare api nextjs to handle POST LIFECYCLE and generate posts externally 




flusso di generazione esterno al website:
- genero con flusso n8n post tutti i giorni pescando da una lista di idee che scrivo in un google sheet
- n8n cerca informazioni su grok, su perplexity, su google 
- sulla base di queste informazioni produco un post
- genero il recordo non pubblicato 
- mando il post a un bot telegram
- via telegram mando dei prompt per modificarlo
- via telegram lo pubblico 

per poter realizzare ii flussi n8n c'è bisogno di creare una nextjs api 

di seguito la lista api per permettere il workflow n8n 

- crea id new post creando due id, uno per italiano e uno per inglese 

- ottieni i metatag dato il post id ( tutto meno il content del contenuto del post, e il path dell'immagine, e lista dei tag id ) 
- modifica i metatag dato il post id ( tutto meno il content del contenuto del post, e il path dell'immagine, e lista dei tag id ) 
- update post tags assigned to post 
- cambia stato da draft a pubblicato : state       Int?       @default(0) // 0: Draft, 1: Published  --> da 0 a 1 
- cambia stato da  pubblicato a draft : state       Int?       @default(0) // 0: Draft, 1: Published  --> da 1 a 0

- elimina post id

- aggiorna tags per post id

- CRUD sulla tabella tag

- upload an image and reference it for what post id updating the link for the image in post table

- convert image of a post id to webp and reference the new generated webp image to that post id

- altro che puo essere utile
