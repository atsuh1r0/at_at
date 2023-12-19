create policy "Give access to a file to user 59r1n3_0"
on "storage"."objects"
as permissive
for select
to public
using (((bucket_id = 'userIcons'::text) AND (name = 'admin/assets/Costa Rican Frog.jpg'::text) AND ((auth.uid())::text = 'd7bed83c-44a0-4a4f-925f-efc384ea1e50'::text)));


create policy "Give access to a file to user 59r1n3_1"
on "storage"."objects"
as permissive
for insert
to public
with check (((bucket_id = 'userIcons'::text) AND (name = 'admin/assets/Costa Rican Frog.jpg'::text) AND ((auth.uid())::text = 'd7bed83c-44a0-4a4f-925f-efc384ea1e50'::text)));


create policy "Give access to a file to user 59r1n3_2"
on "storage"."objects"
as permissive
for update
to public
using (((bucket_id = 'userIcons'::text) AND (name = 'admin/assets/Costa Rican Frog.jpg'::text) AND ((auth.uid())::text = 'd7bed83c-44a0-4a4f-925f-efc384ea1e50'::text)));


create policy "Give access to a file to user 59r1n3_3"
on "storage"."objects"
as permissive
for delete
to public
using (((bucket_id = 'userIcons'::text) AND (name = 'admin/assets/Costa Rican Frog.jpg'::text) AND ((auth.uid())::text = 'd7bed83c-44a0-4a4f-925f-efc384ea1e50'::text)));



