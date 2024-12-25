package com.example.practicomvvm

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView

class Nombre(
    var lista : ArrayList<Persona>
) : RecyclerView.Adapter<Nombre.PersonaViewHolder>() {
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): PersonaViewHolder {
        val inflater = LayoutInflater.from(parent.context)
        val view = inflater.inflate(R.layout.activity_persona_view, parent, false)
        return PersonaViewHolder(view)
    }

    override fun onBindViewHolder(holder: PersonaViewHolder, position: Int) {
        val persona = lista[position]
        holder.lblName.text = persona.nombre
    }

    override fun getItemCount(): Int {
        return lista.size
    }

    class PersonaViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        var lblName = itemView.findViewById<TextView>(R.id.lblNombre)
    }

}