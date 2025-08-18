<template>
  <div class="flex flex-col items-center justify-center bg-white p-4">
    <slot name="inner-card" title="Big title" message="New message"></slot>
    <p>Testing123</p>
    <slot></slot>
  </div>
</template>
