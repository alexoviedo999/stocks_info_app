class CreatePhotos < ActiveRecord::Migration
  def change
    create_table :photos do |t|
      t.string :name
      t.decimal :quote

      t.timestamps
    end
  end
end
